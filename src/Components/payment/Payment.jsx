import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import useFieldValues from 'Base/hooks/useFieldValues';
import LoadingIndicator from 'Components/LoadingIndicator';
import DebugStates from 'DebugStates';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {};

function Payment() {
  const Navigate = useNavigate();
  const [auth] = useAuth();
  let location = useLocation();
  let state = location.state;
  const [amount, setAmount] = useState(state.length);

  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/payment/api/payment/`,
      method: 'POST',
    },
    { manual: true },
  );

  let clothesArray = [];

  const handleSubmit = (e) => {
    e.preventDefault();

    setClothesNum();

    saveRequest({
      data: {
        ...fieldValues,
        payment_detail_set: clothesArray,
        total_price: totalPrice,
        total_amount: amount,
        user_id: auth.user_id,
      },
    }).then((response) => {
      console.log(response.data);
      Navigate(`/payment/${response.data.payment_num}`);
    });
  };

  // //결제한 제품을 장바구니에서 삭제
  const [{ errorMessages }, paymentstatuschange] = useApiAxios(
    {
      url: `/cart/api/cart/${state.cart_num}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleCartdelete = () => {
    state.map((cart) => {
      paymentstatuschange({
        url: `/cart/api/cart/${cart.cart_num}/`,
        method: 'DELETE',
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    });
  };

  //username,user_tel  map 중복값 제거를 위해 id를 제거한 필터

  const filterstate = state.filter(
    (arr, index, callback) =>
      index === callback.findIndex((t) => t.id === arr.id),
  );

  // total_price 계산식

  const totalPrice = state
    .map((item) => item.clothes_num.price)
    .reduce((prev, curr) => prev + curr, 0);

  const setClothesNum = () => {
    state.map((item) => {
      clothesArray.push({ clothes_num: item.clothes_num.clothes_num });
    });
    console.log(clothesArray);
  };

  const handleSave = (e) => {
    handleSubmit(e);
    handleCartdelete(e);
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
      <div className="text-indigo-800">
        {saveError &&
          `결제정보를 확인해주세요. (${saveError.response.status} ${saveError.response.statusText})`}
      </div>

      <h1 className="text-xl font-bold m-auto">결제💰</h1>

      <div className="grid grid-cols-8 m-10 mb-0  ">
        <div className="">
          <h1 className="font-bold m-auto">결제목록</h1>
        </div>
        <hr className="col-start-2 col-span-7 pt-5 border-t-2 border-gray-400" />
        <div className="col-start-3 col-span-2 m-auto">상품정보</div>
        <div className="col-start-6 mr-2 m-auto">가격</div>
        <div className="col-start-7 col-span-2 m-auto">대여기간</div>
      </div>

      <div className="grid grid-cols-8 m-10 mt-2">
        <div className=""></div>

        <div className="col-span-7">
          {state?.map((check) => {
            return (
              <div
                className="grid grid-cols-8 my-3 pt-3 border-t border-gray-400"
                key={check.cart_num}
              >
                <div>
                  <img
                    className="h-20 w-20 object-cover shrink-0 col-start-1 col-span-2 m-auto"
                    src={check.clothes_num.img1}
                  />
                </div>
                <div className="col-start-3 col-span-2 m-auto">
                  {check.clothes_num.title}
                </div>
                <div className="col-start-6 m-auto">
                  {check.clothes_num.price}원
                </div>
                <div className="col-start-7 col-span-2 m-auto">
                  {check.rental_date}~{check.return_date}
                </div>
              </div>
            );
          })}
          <hr />
        </div>
      </div>
      <div className="grid grid-cols-8 m-10 mb-0  ">
        <div className="">
          <h1 className="font-bold m-auto">결제정보</h1>
        </div>
        <hr className="col-start-2 col-span-7 pt-5 border-t-2 border-gray-400" />
        <div className="col-start-3 col-span-3 m-auto">반납방법</div>
        <div className="col-start-6 mr-2 m-auto">결제방법</div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-8 m-10 mt-2">
          <div className=""></div>
          <div className="col-span-7">
            <select
              className="col-start-3 col-span-2 ml-60 outline-none"
              name="return_method"
            >
              <option>반납방법을 선택해주세요!</option>
              <option>직접반납</option>
              <option>택배반납</option>
            </select>

            <select
              className="col-start-6 col-span-2 ml-20 outline-none"
              name="payment_method"
              onChange={handleFieldChange}
              value={fieldValues.payment_method}
            >
              <option value="selected">결제방법을 선택해주세요!</option>
              <option value="카드">카드</option>
              <option value="현금">만나서 현금결제</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-8 m-10 mb-0  ">
          <hr className="col-start-2 col-span-7 pt-5 border-t-2 border-gray-400" />
          <div className="col-start-3 col-span-3 m-auto">대여의상 수</div>
          <div className="col-start-6 mr-2 m-auto">결제금액</div>
        </div>

        <div className="grid grid-cols-8 m-10 mt-2">
          <div className=""></div>
          <div className="col-span-7">
            <div className="col-start-3 col-span-2 ml-60 outline-none">
              {amount}
            </div>

            <div className="col-start-6 col-span-2 ml-20 outline-none">
              {totalPrice}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <button className="mr-2 w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600">
              결제
            </button>
          </div>
          <div className=" text-sm text-right inline-block align-middle">
            <Link
              className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
              type="button"
              to={'/cart/'}
            >
              <h1 className="text-center mt-1.5 text-sm">취소</h1>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
