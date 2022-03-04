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
  const [imageSrc, setImageSrc] = useState('');

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
              className="my-4 ml-4 mr-0 p-1 w-11/12  border border-gray-200 focus-visible:border-gray-500"
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
              className=" my-4 ml-4 mr-0 p-1 w-11/12 h-60  border border-gray-200"
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
            onClick={() => navigate('/community/')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunityForm;
