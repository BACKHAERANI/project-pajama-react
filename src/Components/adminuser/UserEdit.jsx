import produce from 'immer';
import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';
import useFieldValues from 'Base/hooks/useFieldValues';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'Base/Context/AuthContext';
import SideNavAdmin from 'SideNavAdmin';

const INIT_FIELD_VALUES = {
  password: '',
  password2: '',
};

function UserEdit({ user_id }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: userData }, Save] = useApiAxios(
    {
      url: `/user/api/users/${user_id}/`,
      method: 'GET',
    },
    { manual: !user_id },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/user/api/user/${user_id}/`,
      method: 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    userData || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(produce(() => {}));
  }, [userData]);

  const handleSave = () => {
    if (window.confirm('저장하시겠습니까?')) {
      Save().then(() => {
        navigate(`/admin/`);
      });
    }
  };

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
    console.log('formData', formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedUser = response.data;
      navigate(`/admin/${savedUser.user_id}/edit/`);
    });
  };

  return (
    <div className="flex">
      <SideNavAdmin />
      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
        <div>
          {fieldValues.user_id}
          <input
            className="mt-5 border w-80 h-10 text-center"
            type="text"
            name="user_id"
            value={fieldValues.user_id}
            onChange={handleFieldChange}
            placeholder="아이디를 입력해주세요."
          />
          {saveErrorMessages.user_id?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          {saveErrorMessages.password?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="password2"
            value={fieldValues.password2}
            onChange={handleFieldChange}
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          {saveErrorMessages.non_field_errors?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="username"
            value={fieldValues.username}
            onChange={handleFieldChange}
            placeholder="이름을 입력해주세요."
          />
          {saveErrorMessages.username?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="user_nickname"
            value={fieldValues.user_nickname}
            onChange={handleFieldChange}
            placeholder="별명을 입력해주세요."
          />
          {saveErrorMessages.user_nickname?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="user_tel"
            value={fieldValues.user_tel}
            onChange={handleFieldChange}
            placeholder="핸드폰 번호를 입력해주세요. ex)010-1234-1234"
          />
          {saveErrorMessages.user_tel?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="user_birth"
            value={fieldValues.user_birth}
            onChange={handleFieldChange}
            placeholder="생일을 입력해주세요. ex)2022-02-10"
          />
          {saveErrorMessages.user_birth?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <select
            className="mt-5 border w-80 h-10 text-center"
            name="user_genre"
            value={fieldValues.user_genre}
            onChange={handleFieldChange}
          >
            <option value="selected">장르를 선택해주세요!</option>
            <option value="팝핀">팝핀</option>
            <option value="브레이킹">브레이킹</option>
            <option value="락킹">락킹</option>
            <option value="왁킹">왁킹</option>
            <option value="힙합">힙합</option>
            <option value="하우스">하우스</option>
            <option value="크럼프">크럼프</option>
            <option value="기타">기타</option>
          </select>

          {saveErrorMessages.user_genre?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="flex flex-row-reverse gap-4 mt-3 mb-10">
          <Link to="/admin/" className="ml-4 hover:text-purple-400">
            목록
          </Link>
          <>
            <Link
              to={`/admin/${user_id}/edit/`}
              className="ml-4 hover:text-purple-400"
            >
              수정
            </Link>
            <button
            // disabled={deleteLoading}
            // onClick={handleDelete}
            // className="hover:text-red-400"
            >
              삭제
            </button>
          </>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;
