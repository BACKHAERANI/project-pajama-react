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
  const [auth] = useAuth();
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
      data: { ...fieldValues },
    })
      .then(() => {
        navigate(`/profile/${auth.user_id}/`);
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

          <DebugStates fieldValues={fieldValues} />

          <div>
            <button
              onClick={handleSubmit}
              className="
                      w-full
                      text-black
                      bg-primary
                      rounded
                      border border-primary
                      p-3
                      transition
                      hover:bg-opacity-90
                      "
            >
              Send Message
            </button>

            <button
              //   onClick={handleClickCancleButton}
              className="
                      w-full
                      text-black
                      bg-primary
                      rounded
                      border border-primary
                      p-3
                      transition
                      hover:bg-opacity-90
                      "
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
