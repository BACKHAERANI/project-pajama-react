import { useNavigate } from 'react-router-dom';
import QnaList from 'Components/qna/QnaList';
import SideNav from 'SideNav';

function PageQnaIndex() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <SideNav />
      <div>
        <div className="flex pt-20 pr-100 text-lg">
          <h1>[ QnA ]</h1>
        </div>

        <button
          className="flex justify-end"
          onClick={() => navigate('/qna/new/')}
        >
          글쓰기
        </button>
        <div>
          <QnaList />
        </div>
      </div>
    </div>
  );
}

export default PageQnaIndex;
