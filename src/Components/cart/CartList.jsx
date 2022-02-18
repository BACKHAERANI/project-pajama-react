import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';
import CartSummary from './CartSummary';

function CartList() {
  const [auth] = useAuth();
  const [{ data: cartList, loading, error }, refetch] = useApiAxios(
    { url: '/cart/api/cart/', method: 'GET' },
    { manual: true },
  );
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const handleSingleCheck = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <div>
      <h1 className="text-lx">장바구니</h1>

      <hr />

      {cartList &&
        cartList
          .filter((cart) => cart.user_id.user_id === auth.user_id)
          .map((cart, index) => (
            <div>
              <input
                type="checkbox"
                name="cart_num"
                value={cart.cart_num}
                onChange={handleSingleCheck}
                // checked={bChecked}
                // onChange={(e) => checkHandler(e)}
              />
              <div className="text-lg"> {index + 1} </div>
              <CartSummary cart={cart} key={cart.cart_num} />
              <hr />
            </div>
          ))}

      <button>결제</button>

      <DebugStates cartList={cartList} />
    </div>
  );
}

export default CartList;
