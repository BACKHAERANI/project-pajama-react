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
    <>
      <div className="grid grid-cols-8 m-10 mb-0  ">
        <div className="">
          <h1 className="text-xl font-bold m-auto">장바구니</h1>
        </div>
        <hr className="col-start-2 col-span-7 pt-5 border-t-2 border-gray-400" />
        <div className="col-start-2 m-auto">✔</div>
        <div className="col-start-3 col-span-2 m-auto">상품정보</div>
        <div className="col-start-6 m-auto">가격</div>
        <div className="col-start-7 col-span-2 m-auto">대여기간</div>
      </div>

      <div className="grid grid-cols-8 m-10 mt-2">
        <div className=""></div>

        <div className="col-span-7">
          {cartList &&
            cartList
              .filter((cart) => cart.user_id.user_id === auth.user_id)
              .map((cart, index) => (
                <div className="grid grid-cols-8 my-3 pt-3 border-t border-gray-400">
                  <div className="m-auto">
                    <input
                      id={cart.cart_num}
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, cart.cart_num);
                      }}
                      checked={
                        checkedInputs.includes(cart.cart_num) ? true : false
                      }
                    />
                    {index + 1}
                  </div>

                  <>
                    <CartSummary
                      cart={cart}
                      key={cart.cart_num}
                      index={index}
                    />
                  </>
                </div>
              ))}
          <hr className="border-t border-gray-400" />
          <div className=" mt-5 flex justify-between">
            <button
              className="ml-6 w-12 h-8 bg-white rounded-sm text-gray-500 border border-gray-400 transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-600 hover:text-gray-600 "
              disabled={deleteLoading}
              onClick={handleDelete}
            >
              삭제
            </button>
            <div className="flex justify-end">
              <Link
                className=" w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600 "
                type="button"
                to={'/payment/'}
                state={cartList?.filter((cart) =>
                  checkedInputs.includes(cart.cart_num),
                )}
              >
                <p className="text-center mt-1.5 text-sm">결제</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartList;
