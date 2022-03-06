import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import Rating from 'Pages/review/Rating';
import { useState } from 'react';

function ReviewSummary({ review, clothes_num }) {
  const [auth] = useAuth();
  const [reload, setReload] = useState(false);

  const [{ loading: deleteLoading, error: deleteError }, deletereview] =
    useApiAxios(
      {
        url: `/review/api/review_detail/${review.payment_detail_num}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletereview().then(() => {
        setReload((prevState) => !prevState);
        window.location.replace(`/clothes/${clothes_num}`);
      });
    }
  };

  return (
    <div className="my-3">
      <Rating score={review.score} />
      <div>{review.title}</div>

      <div>{review.content}</div>
      <div>
        {review.img1 && (
          <img
            src={review.img1}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
        {review.img2 && (
          <img
            src={review.img2}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
        {review.img3 && (
          <img
            src={review.img3}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
        {review.img4 && (
          <img
            src={review.img4}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
        {review.img5 && (
          <img
            src={review.img5}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
      </div>
      <div className="flex ">
        <div className="mr-2 text-gray-400">
          {review?.payment_num.user_id.user_nickname}
        </div>
        <div className="mr-2 text-gray-400">
          | {review.registration_date.slice(0, 10)}
        </div>
        <div>
          {auth.is_superuser && (
            <button
              className="mr-2 text-red-600"
              disabled={deleteLoading}
              onClick={handleDelete}
            >
              삭제
            </button>
          )}
        </div>

        <hr className="mt-3" />
      </div>
    </div>
  );
}

export default ReviewSummary;
