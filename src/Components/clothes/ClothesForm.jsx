import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';
import useFieldValues from 'Base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'Base/Context/AuthContext';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
  price: '',
  region: '',
};

function ClothesForm({ clothes_num, handleDidSave }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: clothesData }, Save] = useApiAxios(
    {
      url: `/clothes/api/clothes/${clothes_num}/`,
      method: 'GET',
    },
    { manual: !clothes_num },
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
      url: !clothes_num
        ? `/clothes/api/clothes/`
        : `/clothes/api/clothes/${clothes_num}/`,
      method: !clothes_num ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    clothesData || INIT_FIELD_VALUES,
  );

  const handleSave = () => {
    if (window.confirm('저장하시겠습니까?')) {
      Save().then(() => {
        navigate(`/clothes/${clothes_num}/`);
      });
    }
  };

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
          navigate(`/clothes/${savedClothes.clothes_num}/`);
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
        <h2>Clothes Form {clothes_num ? '수정' : '입력'}</h2>
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

        <div className="my-3">
          <select
            className="mt-5 border w-80 h-10 text-center"
            name="category"
            value={fieldValues.category}
            onChange={handleFieldChange}
          >
            <option value="">카테고리</option>
            <option value="TOP">TOP</option>
            <option value="BLOUSE & SHIRT">BLOUSE & SHIRT</option>
            <option value="DRESS">DRESS</option>
            <option value="PANTS">PANTS</option>
            <option value="SKIRT">SKIRT</option>
            <option value="OUTER">OUTER</option>
            <option value="ACC & CAP">ACC & CAP</option>
          </select>
          {saveErrorMessages.category?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
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
          {saveErrorMessages.price?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
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
          {saveErrorMessages.region?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
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
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
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
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img3"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img4"
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-3">
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
          <button>저장</button>
        </div>
      </form>
    </div>
  );
}

export default ClothesForm;
