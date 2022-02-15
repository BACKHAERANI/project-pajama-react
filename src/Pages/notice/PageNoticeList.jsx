import NoticeList from 'Components/notice/NoticeList';
import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';

function PageNoticeList() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  return (
    <div>
      <div>
        <h1 className="text-xl mr-40 inline">공지사항</h1>
      </div>

      <NoticeList />

      {auth.is_superuser && (
        <button
          onClick={() => navigate('/notice/new/')}
          className="mt-4 mb-3 bg-gray-400"
        >
          글쓰기
        </button>
      )}
    </div>
  );
}

export default PageNoticeList;
