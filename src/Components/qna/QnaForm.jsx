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
      <div>
        <h2>QnA Form {qna_num ? '수정' : '입력'}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={fieldValues.title}
              onChange={handleFieldChange}
            />
          </div>

          <div>
            content
            <input
              type="text"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
            />
          </div>

          <div>
            <input
              type="file"
              name="img"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
            />
          </div>

          <div>
            <button>저장</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QnaForm;
