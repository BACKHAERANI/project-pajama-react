import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import useFieldValues from 'Base/hooks/useFieldValues';
import DebugStates from 'DebugStates';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DATA_FIELDS = ['user_nickname', 'user_tel', 'user_genre'];

const initailValues = {};

function ProfileForm() {
  const navigate = useNavigate();
  const [auth, , , logout] = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(initailValues);
  const [{ errorMessages }, saveUserInfo] = useApiAxios(
    {
      url: `/user/api/users/${auth.user_id}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit = () => {
    saveUserInfo({
      data: fieldValues,
    })
      .then(() => {
        logout();
        navigate(`/accounts/login/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <div>
          {DATA_FIELDS.map((dataType, index) => (
            <div key={index} className="mb-6">
              <input
                type="text"
                name={dataType}
                onChange={handleFieldChange}
                placeholder={dataType}
                className="
                      w-full
                      rounded
                      py-3
                      px-[14px]
                      text-body-color text-base
                      border border-[f0f0f0]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
              />

              {errorMessages[dataType] &&
                errorMessages[dataType].map((message, index) => (
                  <p key={index} className="text-xs text-red-400">
                    {message}
                  </p>
                ))}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="mr-3 text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              수정
            </button>

            <button
              onClick={() => navigate(`/profile/${auth.user_id}/`)}
              className="text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              취소
            </button>
          </div>
        </div>
      </div>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default ProfileForm;
