import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';
import { useAuth } from 'Base/Context/AuthContext';

function NoticeDetail({ notice_num }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    {
      url: `/notice/api/notice/${notice_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deletenotice] =
    useApiAxios(
      { url: `/notice/api/notice/${notice_num}/`, method: 'DELETE' },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletenotice().then(() => {
        navigate('/notice/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}
      {notice && (
        <>
          <h3 className="text-2xl my-5">{notice.title}</h3>
          <p>by {notice?.user_id?.user_nickname}</p>
          {notice.img1 && <img src={notice.img1} alt={notice.title} />}
          {notice.img2 && <img src={notice.img2} alt={notice.title} />}
          {notice.img3 && <img src={notice.img3} alt={notice.title} />}
          {notice.img4 && <img src={notice.img4} alt={notice.title} />}
          {notice.img5 && <img src={notice.img5} alt={notice.title} />}
          <div>
            {notice.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex">
        {auth.is_superuser && (
          <>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="hover:text-red-400"
            >
              삭제
            </button>
            <Link
              to={`/notice/${notice_num}/edit/`}
              className="ml-4 hover:text-blue-400"
            >
              수정
            </Link>
          </>
        )}

        <Link to="/notice/" className="ml-4 hover:text-purple-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default NoticeDetail;
