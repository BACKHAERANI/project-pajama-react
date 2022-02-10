import { useApiAxios } from '../../Base/api/base';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useFieldValues from '../../Base/hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';

const INIT_FIELD_VALUES = { title: '', content: '' };

function ClothesForm({ clothesId, handleDidSave }) {
  const [{ data: clothes, loading: getLoading, error: getError }] = useApiAxios(
    `/clothes/api/clothes/${clothesId}/`,
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

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    clothes || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [clothes]);

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
      <h2>빌려줄래요!</h2>

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
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          카테고리
          <input
            name="category"
            value={fieldValues.category}
            placeholder="가격을 입력해주세요."
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed hover:transition-transform duration-300"
          />
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
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed hover:transition-transform duration-300"
          />
          {saveErrorMessages.price?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          장르
          <input
            name="region"
            value={fieldValues.region}
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
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img1"
            // vlaue=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.file?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img2"
            // vlaue=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.file?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img3"
            // vlaue=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.file?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img4"
            // vlaue=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.file?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3">
          제품사진
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="img5"
            // vlaue=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.file?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <button>저장하기</button>
        </div>
      </form>
    </div>
  );
}

export default ClothesForm;
