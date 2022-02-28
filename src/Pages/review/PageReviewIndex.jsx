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
          <div className="flex pt-20 pr-100 text-lg">
            <h1>[ Review ]</h1>
          </div>
          <ReviewList />
        </div>
      </div>
    </div>
  );
}

export default PageReviewIndex;
