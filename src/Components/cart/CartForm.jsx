import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import useFieldValues from 'Base/hooks/useFieldValues';
import LoadingIndicator from 'Components/LoadingIndicator';
import DebugStates from 'DebugStates';
import produce from 'immer';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import React, { useState } from 'react';

const INIT_FIELD_VALUES = {
  rental_date: '',
  return_date: '',
};

function CartForm({ clothes_num, cart_num, handleDidSave }) {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: '/cart/api/cart/',
      method: 'POST',
    },
    { manual: true },
  );
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.img = '';
      }),
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(clothes_num);
    console.log(cart_num);
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
    formData.append('clothes_num', clothes_num);
    formData.append('payment_status', 0);
    console.log(formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      if (window.confirm('장바구니로 이동하시겠습니까?')) {
        navigate('/cart/');
      }
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장하고 있어요.</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <input
          name="rental_date"
          placeholder="대여 시작일을 입력해주세요."
          value={fieldValues.rental_date}
          onChange={handleFieldChange}
          type="date"
        />
        <input
          name="return_date"
          placeholder="반납일을 입력해주세요."
          value={fieldValues.return_date}
          onChange={handleFieldChange}
          type="date"
        />
        <div className="my-10 text-center rounded-3xl text-white w-full h-10 bg-violet-700">
          <button className="mt-2">장바구니</button>
        </div>
      </form>
    </div>
  );
}

export default CartForm;
