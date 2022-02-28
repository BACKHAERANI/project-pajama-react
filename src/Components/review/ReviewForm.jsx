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
      <form onSubmit={handleSubmit}>
        <h2>Review Form 입력</h2>
        <div className="my-3">
          제목
          <input
            name="title"
            value={fieldValues.title}
            placeholder="제목을 입력해주세요."
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
        <div>
          <select
            name="score"
            value={fieldValues.score}
            onChange={handleFieldChange}
            className="bg-gray-100 border border-gray-400"
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
          <div className="text-red-400"></div>
        </div>
        <div>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="bg-gray-100 border border-gray-400"
          />
          <div className="text-red-400"></div>
        </div>
        <div className="float-right my-3 ml-10">
          <Link to="/clothes/" className="hover:text-red-400">
            취소
          </Link>
        </div>
        <div className="float-right my-3">
          <button>저장</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
