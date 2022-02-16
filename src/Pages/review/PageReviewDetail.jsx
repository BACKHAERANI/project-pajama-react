import ReviewDetail from '../../Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';

function PageReviewDetail() {
  const { review_num } = useParams();
  return (
    <div>
      <ReviewDetail review_num={review_num} />
    </div>
  );
}

export default PageReviewDetail;
