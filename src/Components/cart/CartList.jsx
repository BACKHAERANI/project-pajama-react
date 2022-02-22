import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';
import CartSummary from './CartSummary';
import { Link, useNavigate } from 'react-router-dom';

function CartList() {
  const [auth] = useAuth();
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [{ data: cartList, loading, error }, refetch] = useApiAxios(
    { url: '/cart/api/cart/', method: 'GET' },
    { manual: true },
  );
  const Navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
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
                id={cart.cart_num}
                type="checkbox"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, cart.cart_num);
                }}
                checked={checkedInputs.includes(cart.cart_num) ? true : false}
              />

              <div className="text-lg"> {index + 1} </div>
              <CartSummary cart={cart} key={cart.cart_num} />
              <hr />
            </div>
          ))}
      <Link
        to={'/payment/'}
        state={cartList?.filter((cart) =>
          checkedInputs.includes(cart.cart_num),
        )}
      >
        결제
      </Link>

      <DebugStates cartList={cartList} />
    </div>
  );
}

export default CartList;
