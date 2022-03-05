import { useApiAxios } from 'Base/api/base';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import payment_detail from '../../Base/css/payment_detail.jpg';

function PaymentDetail({ payment_num }) {
  const [{ data: payment, loading: payLoading, error: payError }, refetch] =
    useApiAxios(
      {
        url: `/payment/api/payment/${payment_num}/`,
        method: 'GET',
      },
      { manual: true },
    );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="grid grid-cols-5 ">
      <div className="ml-24 mt-16 col-span-2  bg-violet-50 bg-opacity-50">
        <div className="m-4 pb-10 border-y-4 border-dotted border-violet-300 ">
          <div className="m-4 pt-4 ">
            <h2 className=" mt-7 text-indigo-900 text-2xl text-center">
              예약이 완료되었습니다.
            </h2>
            <hr className="m-5 mt-3" />
            {payment && (
              <div className="m-6 text-gray-800">
                <p className=" font-light">
                  총 결제금액 : {payment.total_price}
                </p>
                <p className="mt-2 font-light">
                  결제 방법 : {payment.payment_method}
                </p>
              </div>
            )}

            <div className="mx-5 text-gray-500 text-sm">
              Re-danse를 이용해주셔서 감사합니다.
            </div>
            <div className="mx-5 text-gray-500 text-sm">우리 또, 만나요.</div>
            <hr className="m-5 mt-3 mb-7" />
            <div className="m-auto pt-1 w-24 h-8 rounded-md bg-indigo-900">
              <Link to={'/clothes/'} className=" ml-4 text-white">
                더 볼래요
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-3 col-span-3">
        <img className="w-5/6" src={payment_detail} alt="예약 완료" />
      </div>
    </div>
  );
}

export default PaymentDetail;
