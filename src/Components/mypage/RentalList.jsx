import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from 'SideNav';

function RentalList() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [{ data: payment_detail, loading, error }, refetch] = useApiAxios(
    { url: '/payment/api/payment_detail/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex">
      <SideNav />

      <h2>대여내역</h2>
      {payment_detail &&
        payment_detail
          ?.filter((List) => List.payment_num.user_id.user_id === auth.user_id)
          .map((check) => {
            return (
              <div className="flex" key={check.payment_detail_num}>
                <img className="h-20 w-20" src={check.clothes_num.img1} />
                <div>{check.clothes_num.title}</div>
                <div className="ml-10">{check.clothes_num.price}원</div>
                <div className="float-right my-5 mr-10">
                  <button
                    onClick={() =>
                      navigate(`/review/${check.payment_detail_num}/new/`)
                    }
                  >
                    리뷰쓰기
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default RentalList;
