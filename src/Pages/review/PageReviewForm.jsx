import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../../Components/review/ReviewForm';

function PageReviewForm() {
  const { review_num } = useParams();
  return (
    <div>
      <ReviewForm review_num={review_num} />
    </div>
  );
}

export default PageReviewForm;
