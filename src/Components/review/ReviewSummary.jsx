import Rating from 'Pages/review/Rating';

function ReviewSummary({ review }) {
  return (
    <div className="">
      {review.img1 && (
        <img
          src={review.img1}
          alt={review.title}
          className="w-20 h-20 rounded inline"
        />
      )}

      <div className="">{review.user_nickname}</div>

      <div>{review.title}</div>
      <div>{review.content}</div>
      <Rating score={review.score} />
    </div>
  );
}

export default ReviewSummary;
