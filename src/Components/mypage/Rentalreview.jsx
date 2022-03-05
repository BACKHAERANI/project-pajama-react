import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import Rating from 'Pages/review/Rating';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Rentalreview({ payment_detail_num }) {
  const [auth] = useAuth();
  const [reload, setReload] = useState(false);

  const [{ data: ReviewList, loading, error }, getReview] = useApiAxios(
    { url: '/review/api/review_detail/?all', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    getReview();
  }, [reload]);

  //리뷰 삭제

  const [{ loading: deleteLoading, error: deleteError }, deletereview] =
    useApiAxios(
      {
        url: `/review/api/review_detail/${payment_detail_num}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = (e) => {
    const { value: payment_detail_num } = e.target;

    if (window.confirm('삭제하시겠습니까?')) {
      deletereview({
        url: `/review/api/review_detail/${payment_detail_num}/`,
        method: 'DELETE',
      }).then(() => {
        setReload((prevState) => !prevState);
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-8 mt-8">
        <div className="col-span-8">
          <h1 className="text-xl font-bold m-auto">대여후기</h1>
        </div>
        <hr className="mt-4 col-span-8 pt-5 border-t-2 border-gray-400" />
        <div className="col-start-1 m-auto">번호</div>
        <div className="col-start-2 m-auto">⭐</div>
        <div className="col-start-3 m-auto">상품정보</div>
        <div className="col-start-5 m-auto">리뷰</div>
        <div className="col-start-8 m-auto">삭제</div>
      </div>
      <div className="grid grid-cols-8">
        <div className=""></div>

        <div className="col-span-8">
          {ReviewList?.filter(
            (List) => List.payment_num.user_id.user_id === auth.user_id,
          ).map((review, index) => {
            return (
              <div className="grid grid-cols-8 my-3 pt-3 border-t border-gray-400">
                <div className="m-auto">{index + 1}</div>
                <>
                  <Rating className="col-start-2 m-auto" score={review.score} />

                  <div className="col-start-3 col-span-2 ">
                    <img
                      className="w-24 h-24 object-cover shrink-0"
                      src={review.clothes_num.img1}
                    />
                    {review.clothes_num.title}
                  </div>
                  <div className="col-start-5 ">
                    <p className="font-bold">{review.title}</p>
                    <p>{review.content}</p>
                  </div>
                  <div className="col-start-8">
                    <button
                      className="mt-10 w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
                      onClick={handleDelete}
                      value={review.payment_detail_num}
                    >
                      삭제
                    </button>
                  </div>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Rentalreview;
