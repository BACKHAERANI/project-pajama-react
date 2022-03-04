import produce from 'immer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import useFieldValues from 'Base/hooks/useFieldValues';
import LoadingIndicator from 'Components/LoadingIndicator';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  img5: '',
  user_id: '',
};

function NoticeForm({ notice_num }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [formData, setFormData] = useState();
  const [imageSrc, setImageSrc] = useState('');

  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    {
      url: `/notice/api/notice/${notice_num}/`,
      method: 'GET',
    },
    { manual: !notice_num },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !notice_num
        ? `/notice/api/notice/`
        : `/notice/api/notice/${notice_num}/`,
      method: !notice_num ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    notice || INIT_FIELD_VALUES,
  );

  // useEffect할때 사진을 빈문자열로 만들어준다. - 사진을 저장하지 안해도 저장가능
  useEffect(() => {
    console.log(notice_num);
    setFieldValues(
      produce((draft) => {
        draft.img1 = '';
        draft.img2 = '';
        draft.img3 = '';
        draft.img4 = '';
        draft.img5 = '';
      }),
    );
  }, [notice]);

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

    saveRequest({
      data: formData,
    }).then((response) => {
      const savednotice = response.data;
      navigate(`/notice/${savednotice.notice_num}/`);
    });
  };

  const encodeFileToBase64 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };
  return (
    <div>
      {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit} className=" text-sm">
        <div className="grid grid-cols-5 grid-rows-5">
          <div className="p-5 bg-gray-200 border-t border-gray-300">
            <label className="mt-1 flex justify-center">제목</label>
          </div>
          <div className="col-span-4 border-t border-gray-300">
            <input
              name="title"
              value={fieldValues.title}
              placeholder="제목을 입력해주세요."
              onChange={handleFieldChange}
              type="text"
              className="outline-none my-4 ml-4 mr-0 p-1 w-11/12  border border-gray-200 focus-visible:border-gray-500"
            />
            {saveErrorMessages.title?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5  row-span-4 bg-gray-200">
            <label className="mt-1 flex justify-center">내용</label>
          </div>
          <div className="row-span-4 col-span-4">
            <input
              type="text"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              placeholder="내용을 입력해주세요."
              className="outline-none my-4 ml-4 mr-0 p-1 w-11/12 h-60  border border-gray-200"
            />

            {saveErrorMessages.content?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5 bg-gray-200 row-span-1">
            <label className="mt-1 flex justify-center">첨부파일</label>
          </div>

          <div className="row-span-1 col-span-4">
            <input
              type="file"
              name="img1"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
              className="my-4 ml-4 mr-0 p-1"
            />

            <img src={imageSrc || notice?.img1} alt="img1" />
            {saveErrorMessages.img1?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5 bg-gray-200 row-span-1">
            <label className="mt-1 flex justify-center">첨부파일</label>
          </div>

          <div className="row-span-1 col-span-4">
            <input
              type="file"
              name="img2"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
              className="my-4 ml-4 mr-0 p-1"
            />

            <img src={imageSrc || notice?.img2} alt="img2" />
            {saveErrorMessages.img2?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5 bg-gray-200 row-span-1">
            <label className="mt-1 flex justify-center">첨부파일</label>
          </div>

          <div className="row-span-1 col-span-4">
            <input
              type="file"
              name="img3"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
              className="my-4 ml-4 mr-0 p-1"
            />

            <img src={imageSrc || notice?.img3} alt="img3" />
            {saveErrorMessages.img3?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5 bg-gray-200 row-span-1">
            <label className="mt-1 flex justify-center">첨부파일</label>
          </div>

          <div className="row-span-1 col-span-4">
            <input
              type="file"
              name="img4"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
              className="my-4 ml-4 mr-0 p-1"
            />

            <img src={imageSrc || notice?.img4} alt="img4" />
            {saveErrorMessages.img4?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="p-5 bg-gray-200 row-span-1">
            <label className="mt-1 flex justify-center">첨부파일</label>
          </div>

          <div className="row-span-1 col-span-4">
            <input
              type="file"
              name="img5"
              onChange={handleFieldChange}
              accept=".jpg, .png, .jpeg"
              className="my-4 ml-4 mr-0 p-1"
            />

            <img src={imageSrc || notice?.img5} alt="img5" />
            {saveErrorMessages.img5?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}
          </div>
        </div>

        <hr className=" border-t border-gray-300 p-1" />
        <div className=" flex justify-end p-1  text-sm align-middle">
          <button className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600">
            저장
          </button>
          <button
            className="w-24 h-8 ml-2 bg-white rounded-sm text-gray-500 border border-gray-300 "
            onClick={() => navigate('/notice/')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeForm;
