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
        <h1 className="pt-8  text-xl font-bold">공지사항</h1>
      </div>

      <NoticeList />

      {auth.is_superuser && (
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/notice/new/')}
            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600 "
          >
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
}

export default PageNoticeList;
