import PaymentDetail from 'Components/payment/PaymentDetail';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PagePaymentDetail() {
  const { payment_num } = useParams();

  return (
    <div>
      <PaymentDetail payment_num={payment_num} />
      <Link to={'/clothes/'}>더 볼래요!</Link>
    </div>
  );
}

export default PagePaymentDetail;
