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
  const Navigate = useNavigate();
  const [auth] = useAuth();
  const [formData, setFormData] = useState();

  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    {
      url: `/notice/api/notice/${notice_num}`,
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
      Navigate(`/notice/${savednotice.notice_num}`);
    });
  };
  return (
    <div>
      <h1>공지사항 {notice_num ? '수정' : '입력'} </h1>
      {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <span className="text-xl">title:</span>
          <input
            name="title"
            placeholder="제목을 입력해주세요."
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
          />
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">content:</span>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            type="text"
          />
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">img1 : </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img1"
            onChange={handleFieldChange}
          />
          {saveErrorMessages.img1?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">img2 : </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img2"
            onChange={handleFieldChange}
          />
          {saveErrorMessages.img2?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">img3 : </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img3"
            onChange={handleFieldChange}
          />
          {saveErrorMessages.img3?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">img4 : </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img4"
            onChange={handleFieldChange}
          />
          {saveErrorMessages.img4?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-xl">img5 : </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img5"
            onChange={handleFieldChange}
          />
          {saveErrorMessages.img5?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <button className="border-2 border-purple-400 hover:bg-purple-400">
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeForm;
