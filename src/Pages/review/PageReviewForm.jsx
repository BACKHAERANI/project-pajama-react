import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../../Components/review/ReviewForm';

function PageReviewForm() {
  const { payment_detail_num } = useParams();
  return (
    <div>
      <ReviewForm payment_detail_num={payment_detail_num} />
    </div>
  );
}

export default PageReviewForm;
