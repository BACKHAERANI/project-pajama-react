import { useApiAxios } from '../../Base/api/base';
import { useAuth } from '../../Base/Context/AuthContext';
import useFieldValues from '../../Base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_FIELD_VALUES = { user_id: '', password: '' };

function LoginForm() {
  const [auth, _, login] = useAuth();
  const Navigate = useNavigate();
  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: '/user/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const { access, refresh, user_id, username, user_nickname, is_staff } =
        response.data;
      login({
        access,
        refresh,
        user_id,
        username,
        user_nickname,
        is_staff,
      });
      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('user_id :', user_id);
      console.log('username :', username);
      console.log('user_nickname :', user_nickname);
      Navigate('/');
    });
  };

  return (
    <div>
      <h1>Login</h1>

      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <input
            type="text"
            name="user_id"
            value={fieldValues.user_id}
            onChange={handleFieldChange}
            placeholder="아이디를 입력해주세요."
            className="p-3 bg-gray-100 focus:outline-none focus:border-2 focus:border-purple-500 "
          />
        </div>
        <div className="my-5">
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="비밀번호를 입력해주세요."
            className="p-3 bg-gray-100 focus:outline-none focus:border-2 focus:border-purple-500 "
          />
        </div>
        <div className="my-5">
          <button className=" h-10 border-2 border-purple-500 hover:bg-purple-500">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
