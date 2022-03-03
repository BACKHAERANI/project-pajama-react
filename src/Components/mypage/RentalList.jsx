import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function RentalList() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [query, setQuery] = useState();
  const [reload, setReload] = useState(false);
  const [{ data: payment_detail, loading, error }, refetch] = useApiAxios(
    {
      url: '/payment/api/payment_detail/',
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch()
      .then(({ data }) => {
        setCurrentItems(data?.results);
        setQuery('');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  return (
    <>
      <div className="grid grid-cols-8 mt-8">
        <div className="col-span-8">
          <h1 className="text-xl font-bold m-auto">대여내역</h1>
        </div>
        <hr className="mt-4 col-span-8 pt-5 border-t-2 border-gray-400" />
        <div className="col-start-1 m-auto">번호</div>
        <div className="col-start-2 m-auto">상품정보</div>
        <div className="col-start-6 m-auto">가격</div>
        <div className="col-start-7 col-span-2 m-auto">리뷰</div>
      </div>

      <div className="grid grid-cols-8">
        <div className=""></div>

        <div className="col-span-8">
          {payment_detail &&
            payment_detail
              ?.filter(
                (List) => List.payment_num.user_id.user_id === auth.user_id,
              )
              .map((check, index) => {
                return (
                  <div className="grid grid-cols-8 my-3 pt-3 border-t border-gray-400">
                    <div className="m-auto">{index + 1}</div>
                    <>
                      <div className="col-start-2 m-auto">
                        <img
                          className="w-24 h-24 object-cover shrink-0"
                          src={check.clothes_num.img1}
                        />
                      </div>
                      <div className="col-start-3 col-span-2 m-auto">
                        <p>{check.clothes_num.title}</p>
                      </div>

                      <div className="col-start-6 m-auto">
                        {check.clothes_num.price}원
                      </div>
                      {check.review.length === 0 && (
                        <div className="col-start-7 col-span-2 m-auto">
                          <button
                            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
                            onClick={() =>
                              navigate(
                                `/review/${check.payment_detail_num}/new/`,
                              )
                            }
                          >
                            리뷰쓰기
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                );
              })}
          <hr className="mt-4 col-span-8 pt-5 border-t-2 border-gray-400" />
        </div>
      </div>
    </>
  );
}

export default RentalList;
