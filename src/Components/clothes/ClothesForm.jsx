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

function ClothesForm({ clothesId, handleDidSave }) {
  const { auth } = useAuth;
  const navigate = useNavigate();

  const [{ data: clothesData, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/clothes/api/clothes/${clothesId}/`,
        method: 'GET',
      },
      { manual: !clothesId },
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
      url: !clothesId
        ? '/clothes/api/clothes/'
        : `/clothes/api/clothes/${clothesId}/`,
      method: !clothesId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const handleSave = () => {
    if (window.confirm('저장하시겠습니까?')) {
      saveRequest().then(() => {
        navigate('/clothes/');
      });
    }
  };

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    clothesData || INIT_FIELD_VALUES,
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
  }, [clothesData]);

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

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
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
        </div>

        <div className="my-3">
          카테고리
          <select
            className="mt-5 border w-80 h-10 text-center"
            name="category"
            value={fieldValues.category}
            onChange={handleFieldChange}
          >
            <option value="TOP">TOP</option>
            <option value="BLOUSE & SHIRT">BLOUSE & SHIRT</option>
            <option value="DRESS">DRESS</option>
            <option value="PANTS">PANTS</option>
            <option value="SKIRT">SKIRT</option>
            <option value="OUTER">OUTER</option>
            <option value="ACC & CAP">ACC & CAP</option>
          </select>
        </div>

        <div className="my-3">
          가격
          <input
            name="price"
            value={fieldValues.price}
            placeholder=", 없이 숫자만 입력"
            onChange={handleFieldChange}
            type="int"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed hover:transition-transform duration-300"
          />
        </div>

        <div className="my-3">
          지역
          <input
            name="region"
            value={fieldValues.region}
            placeholder="법정동 까지"
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed hover:transition-transform duration-300"
          />
        </div>

        <div className="my-3">
          내용
          <textarea
            name="content"
            value={fieldValues.content}
            placeholder="내용을 입력해주세요."
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img1"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img2"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img3"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img4"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img5"
            onChange={handleFieldChange}
          />
        </div>
        <div className="float-right my-3 ml-10">
          <Link to="/clothes/" className="hover:text-red-400">
            취소
          </Link>
        </div>
        <div className="float-right my-3">
          <button onClick={handleSave}>저장</button>
        </div>
      </form>
    </div>
  );
}

export default ClothesForm;
