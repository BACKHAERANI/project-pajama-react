import { useNavigate } from 'react-router-dom';
import SideNav from 'SideNav';
import ReviewList from '../../Components/review/ReviewList';

function PageReviewIndex({ payment_detail_num }) {
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
      <div className="float-right my-5 mr-10">
        <button onClick={() => navigate(`/review/new/${payment_detail_num}`)}>
          리뷰쓰러가기
        </button>
      </div>
    </div>
  );
}

export default PageReviewIndex;
