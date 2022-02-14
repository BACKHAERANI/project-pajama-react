import NoticeList from '../../Components/notice/NoticeList';
import { useNavigate } from 'react-router-dom';
import '../../Base/css/Pagination.css';

function PageNoticeList() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1 className="text-xl mr-40 inline">공지사항</h1>
      </div>

      <NoticeList />

      <button
        onClick={() => navigate('/notice/new/')}
        className="mt-4 mb-3 bg-gray-400"
      >
        글쓰기
      </button>
    </div>
  );
}

export default PageNoticeList;
