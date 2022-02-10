import { useApiAxios } from '../../Base/api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from '../../Components/LoadingIndicator';

function ClothesDetail({ clothesId }) {
  const navigate = useNavigate();

  const [{ data: clothes, loading, error }, refetch] = useApiAxios(
    `/clothes/api/clothes/${clothesId}/`,
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteClothes] =
    useApiAxios(
      {
        url: `/clothes/api/clothes/${clothesId}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      // REST API 에서는 DELETE 요청에 대한 응답이 없습니다.
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
          <h3 className="text-2xl my-5">
            [{clothes.mallname}] {clothes.title}
          </h3>
          {clothes.img1 && (
            <img src={clothes.img1} alt={clothes.title} className="rounded" />
          )}
          <h4>{clothes.link}</h4>

          <div>
            {clothes.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제
        </button>
        <Link to={`/clothes/${clothesId}/edit/`} className="hover:text-red-400">
          수정
        </Link>
        <Link to="/clothes/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default ClothesDetail;
