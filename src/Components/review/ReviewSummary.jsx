import Rating from 'Pages/review/Rating';
import { Link } from 'react-router-dom';

function ReviewSummary({ review, score }) {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3">
        {review.img1 && (
          <img
            src={review.img1}
            alt={review.title}
            className="w-20 h-20 rounded inline"
          />
        )}
      </div>
      <div className="col-span-2">{review.user_nickname}</div>
      <div className="row-span-2 col-span-2">
        <div>{review.title}</div>
        <div>{review.content}</div>
        <div>{review.score}</div>
        <Rating score={review.score} />
      </div>
    </div>
  );
}

export default ReviewSummary;
