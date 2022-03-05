import Rating from 'Pages/review/Rating';

function ReviewSummary({ review }) {
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
      </div>
      <hr className="mt-3" />
    </div>
  );
}

export default ReviewSummary;
