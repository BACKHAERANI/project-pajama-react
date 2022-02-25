import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3">
        <Link to={`/review/${review.payment_detail_num}/`}>
          {review.img1 && (
            <img
              src={review.img1}
              alt={review.title}
              className="w-20 h-20 rounded inline"
            />
          )}
        </Link>
      </div>
      <div className="col-span-2">{review.user_nickname}</div>
      <div className="row-span-2 col-span-2">
        <Link to={`/review/${review.payment_detail_num}/`}>{review.title}</Link>
      </div>
    </div>
  );
}

export default ReviewSummary;
