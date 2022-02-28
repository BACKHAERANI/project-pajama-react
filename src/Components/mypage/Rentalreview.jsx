import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import Rating from 'Pages/review/Rating';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from 'SideNav';

function Rentalreview({ score }) {
  const Navigate = useNavigate();
  const [auth] = useAuth();
  const [currentItems, setCurrentItems] = useState(null);
  const [reload, setReload] = useState(false);
  const [{ data, loading, error }, getReview] = useApiAxios(
    { url: '/review/api/review_detail/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    getReview().then((response) => {
      setCurrentItems(response?.data.results);
    });
  }, [reload]);

  //리뷰 삭제

  const [{ loading: deleteLoading, error: deleteError }, deletereview] =
    useApiAxios(
      {
        url: `/review/api/review_detail/${data?.results?.payment_detail_num}`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = (e) => {
    const { value: payment_detail_num } = e.target;

    if (window.confirm('삭제하시겠습니까?')) {
      deletereview({
        url: `/review/api/review_detail/${payment_detail_num}`,
        method: 'DELETE',
      }).then(() => {
        setReload((prevState) => !prevState);
      });
    }
  };

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
              <Rating score={review.score} />
              <img className="h-20 w-20" src={review.clothes_num.img1} />
              <div>{review.clothes_num.title}</div>
              <div className="ml-10">{review.clothes_num.price}원</div>
              <button onClick={handleDelete} value={review.payment_detail_num}>
                삭제
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Rentalreview;
