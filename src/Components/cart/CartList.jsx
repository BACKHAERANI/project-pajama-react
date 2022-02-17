import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import { useEffect } from 'react';
import CartSummary from './CartSummary';

function CartList() {
  const [auth] = useAuth();
  const [{ data: cartList, loading, error }, refetch] = useApiAxios(
    { url: '/cart/api/cart/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h1 className="text-lx">장바구니</h1>

      {cartList &&
        cartList
          .filter((cart) => cart.user_id.user_id === auth.user_id)
          .map((cart) => (
            <div>
              <CartSummary cart={cart} key={cart.cart_num} />
              <hr />
            </div>
          ))}
    </div>
  );
}

export default CartList;
