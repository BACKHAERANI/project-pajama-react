import { useApiAxios } from 'Base/api/base';
import useFieldValues from 'Base/hooks/useFieldValues';
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
    <div className="mt-16 flex justify-center">
      <div className="w-2/5">
        {error &&
          `가입에 실패했습니다. 다시 입력해주세요. (${error.response?.status} ${error.response?.statusText})`}

        <div className="">
          <div className=" bg-white shadow-md border border-gray-200 rounded-lg p-10 ">
            <form className="mb-3 space-y-6" onSubmit={handleSubmit}>
              <p className="text-center text-2xl font-medium text-indigo-900 ">
                회원가입
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
                  value={fieldValues.user_id}
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5  "
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
                <label
                  for="password"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Password
                </label>
                <input
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
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
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
                <label
                  htmlFor="ID"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  이름
                </label>
                <input
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
                <label
                  htmlFor="ID"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  닉네임
                </label>
                <input
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
                <label
                  htmlFor="ID"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  휴대전화
                </label>
                <input
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                  name="user_tel"
                  value={fieldValues.user_tel}
                  onChange={handleFieldChange}
                  placeholder="휴대전화 번호를 입력해주세요. ex)010-1234-1234"
                />
                {errorMessages.user_tel?.map((message, index) => (
                  <p key={index} className="text-xs text-red-400">
                    {message}
                  </p>
                ))}
              </div>
              <div>
                <label
                  htmlFor="ID"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  생년월일
                </label>
                <input
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
                <label
                  htmlFor="ID"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  장르
                </label>
                <select
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
              <div className="pt-5">
                <button
                  className=" w-full text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleSubmit}
                >
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignForm;
