import { useApiAxios } from 'Base/api/base';
import { useEffect } from 'react';
import CartSummary from './CartSummary';

function CartList() {
  const [{ data: cartList, loading, error }, refetch] = useApiAxios(
    { url: '/cart/api/cart/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h1>Cart List</h1>
      {cartList &&
        cartList.map((cart) => (
          <div>
            <CartSummary cart={cart} key={cart.cart_num} />
            <hr />
          </div>
        ))}
    </div>
  );
}

export default CartList;
