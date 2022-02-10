import { useApiAxios } from '../../Base/api/base';
import useFieldValues from '../../Base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INIT_FILED_VALUES = {
  user_id: '',
  password: '',
  password2: '',
  username: '',
  user_nickname: '',
  user_tel: '',
  user_birth: '',
  user_genre: '',
};

function SignForm() {
  const Navigate = useNavigate();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FILED_VALUES);

  const [{ loading, error, errorMessages }, get_signup] = useApiAxios(
    {
      url: 'user/api/user/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    get_signup({ data: fieldValues }).then((response) => {
      const {
        user_id,
        password,
        password2,
        username,
        user_nickname,
        user_tel,
        user_birth,
        user_genre,
      } = response.data;

      console.log('가입이 완료되었습니다.');
      Navigate('/accounts/login/');
    });
  };

  return (
    <div>
      {error &&
        `가입에 실패했습니다.' (${error.response?.status} ${error.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            type="text"
            name="user_id"
            value={fieldValues.user_id}
            onChange={handleFieldChange}
            placeholder="아이디를 입력해주세요."
          />
          {errorMessages.user_id?.map((message, index) => (
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
          {errorMessages.password?.map((message, index) => (
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
          {errorMessages.non_field_errors?.map((message, index) => (
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
          {errorMessages.username?.map((message, index) => (
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
          {errorMessages.user_nickname?.map((message, index) => (
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
          {errorMessages.user_tel?.map((message, index) => (
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
          {errorMessages.user_birth?.map((message, index) => (
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

          {errorMessages.user_genre?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        {/* <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="user_type"
            value={fieldValues.user_type}
            onChange={handleFieldChange}
          />
          {errorMessages.user_type?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            className="mt-5 border w-80 h-10 text-center"
            name="user_auth"
            value={fieldValues.user_auth}
            onChange={handleFieldChange}
          />
          {errorMessages.user_auth?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div> */}
        <button
          className="mt-5 border w-80 h-10 text-center "
          onClick={handleSubmit}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignForm;
