import { useParams } from 'react-router-dom';
import QnaDetail from 'Components/qna/QnaDetail';

function PageQnaDetail() {
  const { qna_num } = useParams();

  return (
    <div>
      <QnaDetail qna_num={qna_num} />
    </div>
  );
}

export default PageQnaDetail;
