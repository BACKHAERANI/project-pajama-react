import Rating from 'Pages/review/Rating';

function ReviewSummary({ review }) {
  return (
    <div className="my-3">
      {review.img1 && (
        <img
          src={review.img1}
          alt={review.title}
          className="w-20 h-20 rounded inline"
        />
      )}

      <div className="">{review.nickname}</div>
      <Rating score={review.score} />
      <div>{review.title}</div>
      <div>{review.content}</div>
      <hr className="mt-3" />
    </div>
  );
}

export default ReviewSummary;
