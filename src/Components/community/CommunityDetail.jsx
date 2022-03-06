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
    {
      url: `/community/api/community/${community_num}/`,
      method: 'DELETE',
    },
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
          <div>
            <div className="grid grid-cols-6   border border-gray-300 ">
              <div className="bg-gray-200">
                <label className=" mt-4 flex justify-center ">제목</label>
              </div>
              <div className="col-span-3">
                <p className=" col-start-3 my-4 ml-4 mr-0 w-10/12">
                  {community.title}
                </p>
              </div>
              <div className="bg-gray-200">
                <label className=" mt-4 flex justify-center ">작성자</label>
              </div>
              <div>
                <p className=" col-start-3 my-4 ml-4 mr-0  w-10/12">
                  {community?.user_id?.user_nickname}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-6 pl-8 py-6 max-h-full max-w-full">
            {community.img1 && (
              <img
                src={community.img1}
                alt={community.title}
                className="max-w-3xl max-h-full"
              />
            )}
            {community.img2 && (
              <img
                src={community.img2}
                alt={community.title}
                className="max-w-3xl max-h-full"
              />
            )}
            {community.img3 && (
              <img
                src={community.img3}
                alt={community.title}
                className="max-w-3xl max-h-full"
              />
            )}
            {community.img4 && (
              <img
                src={community.img4}
                alt={community.title}
                className="max-w-3xl max-h-full"
              />
            )}
            {community.img5 && (
              <img
                src={community.img5}
                alt={community.title}
                className="max-w-3xl max-h-full"
              />
            )}
          </div>

          {community.content.split(/[\r\n]/).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </>
      )}
      <hr className="mt-10 mb-3" />
      <div className="flex justify-end">
        {community?.user_id?.user_id === auth.user_id && !auth.is_superuser && (
          <>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="mr-2 w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            >
              삭제
            </button>

            <Link
              to={`/community/${community_num}/edit/`}
              type="button"
              className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            >
              <h1 className="text-center mt-1.5 text-sm">수정</h1>
            </Link>
          </>
        )}
        {auth.is_superuser && (
          <>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            >
              삭제
            </button>
          </>
        )}

        <div className="flex justify-end">
          <div className=" ml-2 pr-1 inline-block align-middle flex justify-end">
            <Link
              className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
              type="button"
              to="/community/"
            >
              <h1 className="text-center mt-1.5 text-sm">목록</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetail;
