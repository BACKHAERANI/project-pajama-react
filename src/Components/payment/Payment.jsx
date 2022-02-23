import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import useFieldValues from 'Base/hooks/useFieldValues';
import LoadingIndicator from 'Components/LoadingIndicator';
import DebugStates from 'DebugStates';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  total_amount: '',
  payment_method: '',
  total_price: '',
};

function Payment() {
  const Navigate = useNavigate();
  const [auth] = useAuth();
  let location = useLocation();
  let state = location.state;
  const [amount, setAmount] = useState(state.length);

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

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    formData.append('user_id', auth.user_id);
    formData.append('total_amount', amount);
    formData.append('total_price', totalPrice);
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedpayment = response.data;
      Navigate(`/payment/${savedpayment.payment_num}/`);
    });
    console.log('결제완료');
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

  return (
    <div>
      <div>
        {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
        {saveError &&
          `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}
        <h2 className="text-lg">결제</h2>
        {state?.map((check) => {
          return (
            <div className="flex" key={check.cart_num}>
              <img className="h-20 w-20" src={check.clothes_num.img1} />
              <div>{check.clothes_num.title}</div>
              <div className="ml-10">{check.clothes_num.price}원</div>
              <div className="ml-10">
                {check.rental_date}~{check.return_date}
              </div>
            </div>
          );
        })}
        <hr />
        <div>
          <span>----대여회원정보----</span>

          {filterstate.map((check) => {
            return (
              <div key={check.cart_num}>
                <span>회원이름:</span>
                <div>{check.user_id?.username}</div>
                <span>회원전화번호:</span>
                <div>{check.user_id?.user_tel}</div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <select name="return_method">
              <option>반납방법을 선택해주세요!</option>
              <option>직접반납</option>
              <option>택배반납(+2500원 추가)</option>
            </select>
          </div>
          <div>
            <select
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
        <hr />
        <div>
          <h2 className="text-lg">----총결제정보----</h2>
          <div>
            <span>대여의상 수:</span>
            <input
              name="total_amount"
              onChange={handleFieldChange}
              value={amount}
            />
          </div>

          <div>
            <span>총결제금액:</span>
            <input
              name="total_price"
              onChange={handleFieldChange}
              value={totalPrice}
            />
          </div>
        </div>
        <hr />
        <button className="text-lg mr-10 hover:bg-purple-300">결제</button>
        <Link to={'/cart/'}>취소 </Link>
      </form>
      <DebugStates state={state} />
    </div>
  );
}

export default Payment;
