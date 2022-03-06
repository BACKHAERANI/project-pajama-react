import { useNavigate } from 'react-router-dom';
import SideNav from 'SideNav';
import ReviewList from '../../Components/review/ReviewList';

function PageReviewIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex">
        <SideNav />
        <div>
          <ReviewList />
        </div>
      </div>
    </div>
  );
}

export default PageReviewIndex;
