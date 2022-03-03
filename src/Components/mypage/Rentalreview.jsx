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
            <div className="grid col-span-4 auto-rows-max">
              <h1 className=" pt-8  text-xl font-bold">대여후기</h1>
              <div
                className="grid grid-cols-5 grid-rows-5 border-t"
                key={review.payment_detail_num}
              >
                <div className="row-span-1 col-span-1">{review.title}</div>
                <div className="row-span-1 col-span-1">{review.content}</div>
                <div className="row-span-1 col-span-1">{review.score}</div>
                <Rating score={review.score} />
                <img className="h-20 w-20" src={review.clothes_num.img1} />
                <div className="row-span-1 col-span-1">
                  {review.clothes_num.title}
                </div>
                <div className="row-span-1 col-span-1">
                  {review.clothes_num.price}원
                </div>
                <button
                  className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
                  onClick={handleDelete}
                  value={review.payment_detail_num}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Rentalreview;
