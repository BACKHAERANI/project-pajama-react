import { useNavigate, useParams } from 'react-router-dom';
import QnaForm from 'Components/qna/QnaForm';

function PageQnaForm() {
  const navigate = useNavigate();
  const { qna_num } = useParams();

  return (
    <QnaForm
      qna_num={qna_num}
      handleDidSave={(savedQna) => navigate(`/qna/${savedQna.qna_num}/`)}
    />
  );
}

export default PageQnaForm;
