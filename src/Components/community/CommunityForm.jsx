import produce from 'immer';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
};

function CommunityForm({ community_num, handleDidSave }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [formData, setFormData] = useState();

  const [{ data: community }, refetch] = useApiAxios(
    {
      url: `/community/api/community/${community_num}/`,
      method: 'GET',
    },
    { manual: !community_num },
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
      url: !community_num
        ? `/community/api/community/`
        : `/community/api/community/${community_num}/`,
      method: !community_num ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    community || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.img1 = '';
        draft.img2 = '';
        draft.img3 = '';
        draft.img4 = '';
        draft.img5 = '';
      }),
    );
  }, [community]);

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
    console.log('formData', formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedCommunity = response.data;
      navigate(`/community/${savedCommunity.community_num}/`);
    });
  };
  return (
    <div>
      <h1>커뮤니티 {community_num ? '수정' : '입력'} </h1>
      {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <span className="text-l">제목:</span>
          <input
            name="title"
            placeholder="제목을 입력해주세요."
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed hover:transition-transform duration-300"
          />
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-l">내용:</span>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          <span className="text-l">img1 : </span>
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
          <span className="text-l">img2 : </span>
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
          <span className="text-l">img3 : </span>
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
          <span className="text-l">img4 : </span>
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
          <span className="text-l">img5 : </span>
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

        <div className="float-right my-3 ml-10">
          <Link
            to="/community/"
            className="border-2 border-purple-400 hover:bg-purple-400"
          >
            취소
          </Link>
        </div>
        <div className="float-right my-3 border-2 border-purple-400 hover:bg-purple-400">
          <button>저장</button>
        </div>
      </form>
    </div>
  );
}

export default CommunityForm;
