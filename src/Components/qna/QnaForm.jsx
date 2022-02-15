import { useEffect } from 'react';
import { useApiAxios } from 'Base/api/base';
import useFieldValues from 'Base/hooks/useFieldValues';
import produce from 'immer';
import { Navigate, useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
  user_id: '123',
  answer: '',
  img: '',
};

function QnaForm({ qna_num, handleDidSave }) {
  const navigate = useNavigate();
  const [{ data: qna, loading: getLoading, error: getError }] = useApiAxios(
    `/qna/api/qna/${qna_num}/`,
    {
      manual: !qna_num,
    },
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
      url: !qna_num ? '/qna/api/qna/' : `/qna/api/qna/${qna_num}/`,
      method: !qna_num ? 'POST' : 'PUT',
    },
    { manual: true },
  );
  const { fieldValues, handleFieldChange, setFieldValues, formData } =
    useFieldValues(qna || INIT_FIELD_VALUES);

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.img = '';
      }),
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedQnaPhoto = response.data;
      if (handleDidSave) handleDidSave(savedQnaPhoto);
      navigate(`/qna/${qna_num}/`);
    });
  };

  return (
    <div>
      <h2>QnA Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
          />
        </div>

        <div>
          user_id
          <input
            type="text"
            name="user_id"
            value={fieldValues.user_id}
            onChange={handleFieldChange}
          />
        </div>

        <div>
          content
          <input
            type="text"
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
          />
        </div>

        <div>
          <input
            type="file"
            name="img"
            onChange={handleFieldChange}
            accept=".jpg, .png, .jpeg"
          />
        </div>

        <div>
          answer
          <input
            type="text"
            name="answer"
            value={fieldValues.answer}
            onChange={handleFieldChange}
          />
        </div>

        <div>
          <button>저장</button>
        </div>
      </form>
    </div>
  );
}

export default QnaForm;
