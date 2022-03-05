import Rating from 'Pages/review/Rating';

function ReviewSummary({ review }) {
  return (
    <div className="my-3">
      <div className="">{review.nickname}</div>
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
      <hr className="mt-3" />
    </div>
  );
}

export default ReviewSummary;
