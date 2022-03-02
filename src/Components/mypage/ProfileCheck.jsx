import { useAuth } from 'Base/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'Base/hooks/useFieldValues';
import { useApiAxios } from 'Base/api/base';
import { useState } from 'react';
import DebugStates from 'DebugStates';

const INITIAL_FIELD_VALUES = { password: '' };

function ProfileCheck({ user_id }) {
  const [auth, _, login] = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(auth.user_id);

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

    requestToken({ data: { ...fieldValues, user_id: userId } }).then(
      (response) => {
        const {
          access,
          refresh,
          user_id,
          username,
          user_nickname,
          is_staff,
          is_superuser,
        } = response.data;
        login({
          access,
          refresh,
          user_id,
          username,
          user_nickname,
          is_staff,
          is_superuser,
        });
        console.log('access :', access);
        console.log('refresh :', refresh);
        console.log('user_id :', user_id);
        console.log('username :', username);
        console.log('user_nickname :', user_nickname);
        console.log(' is_superuser :', is_superuser);
        navigate(`/profile/${user_id}/`);
      },
    );
  };
  return (
    <div>
      <div className="mt-16 flex justify-center">
        <div className="w-2/5">
          {error?.response?.status === 401 && (
            <div className="text-red-400">로그인에 실패했습니다.</div>
          )}

          <div className="">
            <div className=" bg-white shadow-md border border-gray-200 rounded-lg p-10 ">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <p className="text-center text-2xl font-medium text-indigo-900 ">
                  비밀번호 확인
                </p>
                <div>
                  <label
                    htmlFor="ID"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    value={userId}
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5  "
                    placeholder="아이디를 입력해주세요."
                    onChange={handleFieldChange}
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={fieldValues.password}
                    placeholder="비밀번호를 입력해주세요"
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                    onChange={handleFieldChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  enter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCheck;
