import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from '../../Base/api/base';
import LoadingIndicator from '../LoadingIndicator';

function NoticeDetail({ notice_num }) {
  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    {
      url: `/notice/api/notice/${notice_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

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
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/notice/" className="hover:text-purple-400">
          목록으로
        </Link>
      </div>
    </div>
  );
}

export default NoticeDetail;
