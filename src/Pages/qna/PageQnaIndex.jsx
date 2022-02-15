import { useNavigate } from 'react-router-dom';
import QnaList from 'Components/qna/QnaList';

function PageQnaIndex() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>[QnA]</h1>
      <button onClick={() => navigate('/qna/new/')}>글쓰기</button>
      <div>
        <QnaList />
      </div>
    </div>
  );
}

export default PageQnaIndex;
