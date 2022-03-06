import { useApiAxios } from 'Base/api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import { useAuth } from 'Base/Context/AuthContext';
import PageCartForm from 'Pages/cart/PageCartForm';
import ReviewList from 'Components/review/ReviewList';
import noneimg from 'Base/css/noneimg.jpg';

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
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              {clothes.img1 && (
                <img
                  src={clothes.img1}
                  alt={clothes.title}
                  className=" w-full max-h-screen object-cover shrink-0"
                />
              )}
              {!clothes.img1 && (
                <img
                  src={noneimg}
                  alt="noneimg"
                  className="w-full max-h-screen object-cover shrink-0"
                />
              )}
            </div>
            <div className="col-span-3 mx-16 mt-10">
              <p className="text-2xl font-bold">{clothes.title}</p>
              <p className="text-sm text-gray-500">[{clothes.category}]</p>
              <p className="mt-10 text-3xl font-mbold">{clothes.price}원</p>

              <div className="grid grid-cols-4">
                <div className="col-span-4">
                  <hr className=" mt-8 border-t border-gray-100" />
                </div>
                <div>
                  <p className="mt-4">작성자</p>
                </div>
                <p className="mt-4 col-span-3">
                  {clothes?.user_id?.user_nickname}
                </p>
                <div className="col-span-4">
                  <hr className=" mt-4 border-t border-gray-100" />
                </div>
                <div>
                  <p className="mt-4">지역</p>
                </div>
                <p className="mt-4 col-span-3">{clothes.region}</p>
                <div className="col-span-4">
                  <hr className=" mt-4 border-t border-gray-100" />
                </div>
                <div className="mt-4 col-span-4">
                  <PageCartForm clothes_num={clothes_num} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-40 text-sm ">
            {clothes.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4  mb-20">
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

      <ReviewList clothes_num={clothes_num} />

      <div className="flex flex-row-reverse gap-4 mt-3 mb-10">
        <Link
          to="/clothes/"
          className="text-center  w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
        >
          <button className="mt-1">목록</button>
        </Link>
        {clothes?.user_id?.user_id === auth.user_id && !auth.is_superuser && (
          <>
            <Link
              to={`/clothes/${clothes_num}/edit/`}
              className="text-center  w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            >
              <button className="mt-1">수정</button>
            </Link>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="w-24 h-8 ml-2 bg-white rounded-sm text-gray-500 border border-gray-300 "
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
              className="w-24 h-8 ml-2 bg-white rounded-sm text-gray-500 border border-gray-300 "
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
