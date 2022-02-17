import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';
import { useAuth } from 'Base/Context/AuthContext';

function CommunityDetail({ community_num }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [{ data: community, loading, error }, refetch] = useApiAxios(
    {
      url: `/community/api/community/${community_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading }, deletecommunity] = useApiAxios(
    { url: `/community/api/community/${community_num}/`, method: 'DELETE' },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletecommunity().then(() => {
        navigate('/community/');
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
      {community && (
        <>
          <div className="flex">
            <h3 className="flex-none"> 제목 : {community.title}</h3>
            <h3 className="grow ml-80">
              작성자 : {community?.user_id?.user_nickname}
            </h3>
            <h3 className="flex-none ml-20">
              작성일 : {community.registration_date.slice(0, 10)}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 my-20">
            {community.img1 && (
              <img
                src={community.img1}
                alt={community.title}
                className="rounded"
              />
            )}
            {community.img2 && (
              <img
                src={community.img2}
                alt={community.title}
                className="rounded"
              />
            )}
            {community.img3 && (
              <img
                src={community.img3}
                alt={community.title}
                className="rounded"
              />
            )}
            {community.img4 && (
              <img
                src={community.img4}
                alt={community.title}
                className="rounded"
              />
            )}
            {community.img5 && (
              <img
                src={community.img5}
                alt={community.title}
                className="rounded"
              />
            )}
          </div>
          <div>
            {community.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />

      <div className="flex flex-row-reverse gap-4 mt-3 mb-10">
        <Link to="/community/" className="ml-4 hover:text-purple-400">
          목록
        </Link>
        {auth.user_id && (
          <>
            <Link
              to={`/community/${community_num}/edit/`}
              className="ml-4 hover:text-purple-400"
            >
              수정
            </Link>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="hover:text-red-400"
            >
              삭제
            </button>
          </>
        )}
        {auth.is_superuser && (
          <>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="hover:text-red-400"
            >
              관리자 삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CommunityDetail;
