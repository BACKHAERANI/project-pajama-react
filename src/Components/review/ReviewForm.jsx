import { useApiAxios } from '../../Base/api/base';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useFieldValues from '../../Base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Base/Context/AuthContext';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
  user_id: '',
};

function ReviewForm({ payment_detail_num, handleDidSave }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/review/api/review_detail/`,
      method: 'POST',
    },
    { manual: true },
  );

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
    formData.append('payment_detail_num', payment_detail_num);

    console.log(formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedreview = response.data;
      if (handleDidSave) handleDidSave(savedreview);
      navigate(`/mypage/review/`);
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}
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
          <div className="p-5  row-span-1 bg-gray-200">
            <label className="mt-1 flex justify-center">평점</label>
          </div>
          <div className="row-span-1 col-span-4">
            <select
              name="score"
              value={fieldValues.score}
              onChange={handleFieldChange}
              className="my-4 ml-4 mr-0 p-1 w-1/12  border border-gray-200 focus-visible:border-gray-500"
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <div className="p-5  row-span-2 bg-gray-200">
            <label className="mt-1 flex justify-center">내용</label>
          </div>
          <div className="row-span-2 col-span-4">
            <input
              type="text"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              placeholder="내용을 입력해주세요."
              className=" my-4 ml-4 mr-0 p-1 w-11/12 h-24  border border-gray-200"
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

export default ReviewForm;
