import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import ReviewSummary from 'Components/review/ReviewSummary';
import { useEffect, useState } from 'react';
import SideNav from 'SideNav';

function Rentalreview() {
  const [auth] = useAuth();
  const [currentItems, setCurrentItems] = useState(null);
  const [{ data, loading, error }, getReview] = useApiAxios(
    { url: '/review/api/review_detail/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    getReview().then((response) => {
      setCurrentItems(response?.data.results);
    });
  }, []);

  return (
    <div className="flex">
      <SideNav />

      {currentItems
        ?.filter((List) => List.payment_num.user_id.user_id === auth.user_id)
        .map((review) => {
          return (
            <div key={review.payment_detail_num}>
              <div>{review.title}</div>
              <div>{review.content}</div>
              <div>{review.score}</div>
              <img className="h-20 w-20" src={review.clothes_num.img1} />
              <div>{review.clothes_num.title}</div>
              <div className="ml-10">{review.clothes_num.price}원</div>
            </div>
          );
        })}
    </div>
  );
}

export default Rentalreview;
