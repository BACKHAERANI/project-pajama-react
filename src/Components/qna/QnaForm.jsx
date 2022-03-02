import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import useFieldValues from 'Base/hooks/useFieldValues';
import produce from 'immer';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';

const DATA_FIELDS = ['answer'];

const initailValues = {};

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
  user_id: '',
  answer: '',
  img: '',
};

function QnaForm({ qna_num, handleDidSave }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [formData, setFormData] = useState();
  const [answer, setAnswer] = useState();

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: '/qna/api/qna/',
      method: 'POST',
    },
    { manual: true },
  );
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  const [{ errorMessages }, saveUserInfo] = useApiAxios(
    {
      url: `/qna/api/qna/${qna_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit2 = () => {
    saveUserInfo({
      data: { answer: answer },
    })
      .then(() => {
        navigate(`/qna/${qna_num}/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    formData.append('user_id', auth.user_id);

    console.log(formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedQnaPhoto = response.data;
      if (handleDidSave) handleDidSave(savedQnaPhoto);
      navigate(`/qna/${savedQnaPhoto.qna_num}/`);
    });
  };

  if (auth.isLoggedIn && auth.is_superuser) {
    return (
      <div>
        {DATA_FIELDS.map((dataType, index) => (
          <div key={index}>
            <input
              type="text"
              name={dataType}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              placeholder={dataType}
            />
          </div>
        ))}
        <div>
          <button onClick={handleSubmit2}>Modify</button>

          <button onClick={() => navigate(`/qna/${qna_num}`)}>Cancle</button>
        </div>
        <DebugStates fieldValues={fieldValues} />
      </div>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit} className=" text-sm">
          <div className="grid grid-cols-5 grid-rows-5  ">
            <div className="p-5  bg-gray-200 border-t border-gray-300">
              <label className=" ml-12  font-medium">제목</label>
            </div>
            <div className="col-span-4 border-t border-gray-300">
              <input
                type="text"
                name="title"
                value={fieldValues.title}
                onChange={handleFieldChange}
                className=" my-4 ml-4 mr-4 p-1 w-11/12  border border-gray-200 focus-visible:border-gray-500"
              />
            </div>
            <div className="p-5  row-span-2 bg-gray-200">
              <label className=" ml-9  align-middle font-medium ">
                문의내용
              </label>
            </div>
            <div className="row-span-2 col-span-4">
              <input
                type="text"
                name="content"
                value={fieldValues.content}
                onChange={handleFieldChange}
                className=" my-4 ml-4 mr-0 p-1 w-11/12 h-24  border border-gray-200"
              />
            </div>

            {/* <hr className=" border-t border-gray-100" /> */}

            <div className="p-5 bg-gray-200 row-span-2">
              <label className="ml-9  font-medium ">첨부파일</label>
            </div>

            <div className="row-span-2 col-span-4">
              <input
                type="file"
                name="img"
                onChange={handleFieldChange}
                accept=".jpg, .png, .jpeg"
                className="my-4 ml-4 mr-0 p-1"
              />
            </div>
          </div>
          <hr className=" border-t border-gray-300 p-1" />
          <div className=" flex justify-end p-1  text-sm align-middle">
            <button
              className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
              onClick={() => navigate('/qna/new/')}
            >
              저장
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default QnaForm;
