import { useNavigate } from 'react-router-dom';
import ReviewList from '../../Components/review/ReviewList';

function PageReviewIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="float-right my-5 mr-10">
        <button onClick={() => navigate('/review/new/')}>리뷰쓰러가기</button>
      </div>
      <ReviewList />
    </div>
  );
}

export default PageReviewIndex;
