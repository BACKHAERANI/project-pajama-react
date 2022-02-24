import { useApiAxios } from 'Base/api/base';
import { useEffect } from 'react';

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
    <div>
      <h2>예약이 완료되었습니다.</h2>
      {payment && (
        <div>
          <span>총 결제금액 : {payment.total_price}</span>
          <span>결제 방법 : {payment.payment_method}</span>
        </div>
      )}

      <div>re-danse를 이용해주셔서 감사합니다. 우리 또, 만나요.</div>
    </div>
  );
}

export default PaymentDetail;
