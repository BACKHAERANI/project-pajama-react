import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

function CartList({ cart_num }) {
  const [auth] = useAuth();
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [{ data: cartList, loading, error }, refetch] = useApiAxios(
    { url: '/cart/api/cart/', method: 'GET' },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deletecart] =
    useApiAxios(
      { url: `/cart/api/cart/${cart_num}/`, method: 'DELETE' },
      { manual: true },
    );

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

  //장바구니 삭제기능
  const checkedDelete = (id) => {
    deletecart({
      url: `/cart/api/cart/${id}/`,
      method: 'DELETE',
    }).then(() => {
      window.location.replace(`/cart/`);
    });
  };

  const handleDelete = () => {
    checkedInputs.map((cart_num) => {
      checkedDelete(cart_num);
    });
    setCheckedInputs([]);
  };

  return (
    <div>
      <h1 className="text-lx">장바구니</h1>

      <hr />
      <button disabled={deleteLoading} onClick={handleDelete}>
        삭제
      </button>
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
