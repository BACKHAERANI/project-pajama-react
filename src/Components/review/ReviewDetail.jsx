import { useApiAxios } from '../../Base/api/base';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from '../../Components/LoadingIndicator';
import PageReviewIndex from '../../Pages/review/PageReviewIndex';

function ReviewDetail({ payment_detail_num }) {
  const navigate = useNavigate();

  const [{ data: review, loading, error }, refetch] = useApiAxios(
    {
      url: `/review/api/review_detail/${payment_detail_num}/`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteClothes] =
    useApiAxios(
      {
        url: `/review/api/review_detail/${payment_detail_num}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteClothes().then(() => {
        navigate('/review/');
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

      {review && (
        <>
          <h3 className="text-2xl my-5">{review.title}</h3>
          <h4>{review.score}</h4>
          <div>
            {review.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
          {review.img1 && (
            <img src={review.img1} alt={review.title} className="rounded" />
          )}
          {review.img2 && (
            <img src={review.img2} alt={review.title} className="rounded" />
          )}
          {review.img3 && (
            <img src={review.img3} alt={review.title} className="rounded" />
          )}
          {review.img4 && (
            <img src={review.img4} alt={review.title} className="rounded" />
          )}
          {review.img5 && (
            <img src={review.img5} alt={review.title} className="rounded" />
          )}
        </>
      )}
      <hr className="my-3" />
      <h5>
        <PageReviewIndex />
      </h5>
      <hr className="my-3" />
      <div className="flex flex-row-reverse gap-4 mt-3 mb-10">
        <Link to="/clothes/" className="hover:text-red-400">
          목록
        </Link>
        <Link
          to={`/review/${payment_detail_num}/edit/`}
          className="hover:text-red-400"
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
      </div>
    </div>
  );
}

export default ReviewDetail;
