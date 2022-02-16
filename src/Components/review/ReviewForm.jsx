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
};

function ReviewForm({ review_num, handleDidSave }) {
  const { auth } = useAuth;
  const navigate = useNavigate();

  const [{ data: reviewData }, Save] = useApiAxios(
    {
      url: `/review/api/review_detail/${review_num}/`,
      method: 'GET',
    },
    { manual: !review_num },
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
      url: !review_num
        ? '/review/api/review_detail/'
        : `/review/api/review_detail/${review_num}/`,
      method: !review_num ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    reviewData || INIT_FIELD_VALUES,
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
  }, [reviewData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('저장하시겠습니까?')) {
      Save().then(() => {
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
          const savedClothes = response.data;
          if (handleDidSave) handleDidSave(savedClothes);
          navigate(`/review_detail/${savedClothes.review_num}/`);
        });
      });
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <h2>Review Form {review_num ? '수정' : '입력'}</h2>
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
