import { useApiAxios } from 'Base/api/base';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import PageReviewIndex from 'Pages/review/PageReviewIndex';
import { useAuth } from 'Base/Context/AuthContext';

function ClothesDetail({ clothes_num }) {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [{ data: clothes, loading, error }, refetch] = useApiAxios(
    {
      url: `/clothes/api/clothes/${clothes_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteClothes] =
    useApiAxios(
      {
        url: `/clothes/api/clothes/${clothes_num}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteClothes().then(() => {
        navigate('/clothes/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}

      {clothes && (
        <>
          <div className="grid">
            <h3 className="text-2xl my-5">{clothes.title}</h3>
            <h4 className="text-xl my-5">[카테고리:{clothes.category}]</h4>
            <h5 className="text-l my-5">
              [작성자:{clothes?.user_id?.user_nickname}] [지역:{clothes.region}]
              [가격:
              {clothes.price}원]
            </h5>
          </div>
          <div>
            {clothes.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 my-20">
            {clothes.img1 && (
              <img src={clothes.img1} alt={clothes.title} className="rounded" />
            )}
            {clothes.img2 && (
              <img src={clothes.img2} alt={clothes.title} className="rounded" />
            )}
            {clothes.img3 && (
              <img src={clothes.img3} alt={clothes.title} className="rounded" />
            )}
            {clothes.img4 && (
              <img src={clothes.img4} alt={clothes.title} className="rounded" />
            )}
            {clothes.img5 && (
              <img src={clothes.img5} alt={clothes.title} className="rounded" />
            )}
          </div>
        </>
      )}
      <hr className="my-3" />
      <h5>
        <PageReviewIndex />
      </h5>
      <hr className="my-3" />
      <div className="flex flex-row-reverse gap-4 mt-3 mb-10">
        <Link to="/clothes/" className="ml-4 hover:text-purple-400">
          목록
        </Link>
        {clothes?.user_id?.user_id === auth.user_id && !auth.is_superuser && (
          <>
            <Link
              to={`/clothes/${clothes_num}/edit/`}
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
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ClothesDetail;
