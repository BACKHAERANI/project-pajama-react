import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  return (
    <div>
      <Link to={`/review/${review.payment_detail_num}/`}>
        {review.img1 && (
          <img
            src={review.img1}
            alt={review.title}
            className="w-35 h-35 rounded inline"
          />
        )}
      </Link>
      <div className="grid">
        <Link to={`/review/${review.payment_detail_num}/`}>{review.title}</Link>
      </div>
    </div>
  );
}

export default ReviewSummary;
