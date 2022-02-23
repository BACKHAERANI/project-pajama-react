import CartList from 'Components/cart/CartList';
import { useParams } from 'react-router-dom';

function PageCartList() {
  const { cart_num } = useParams();
  return (
    <div>
      <CartList />
    </div>
  );
}

export default PageCartList;
