import { useApiAxios } from 'Base/api/base';

function Payment() {
  const [{ data: paymentList }, getcheck] = useApiAxios(
    {
      url: `/payment/api/payment/`,
      method: 'GET',
    },
    { manual: true },
  );

  return (
    <div>
      <h2>결제</h2>
    </div>
  );
}

export default Payment;
