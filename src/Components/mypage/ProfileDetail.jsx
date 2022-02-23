import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import LoadingIndicator from 'Components/LoadingIndicator';
import useFieldValues from 'Base/hooks/useFieldValues';
import DebugStates from 'DebugStates';

const initailValues = {};

function ProfileDetail({ user_id }) {
  const [auth, , , logout] = useAuth();
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(initailValues);

  const [{ data: profile, loading, error }, refetch] = useApiAxios(
    {
      url: `/user/api/users/${user_id}/`,
      headers: { Authorization: `Bearer ${auth.access}` },
    },
    { manual: true },
  );
  useEffect(() => {
    refetch();
  }, []);

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
    saveUserInfo({ data: { is_active: '0' } })
      .then(() => {
        logout();
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
    // saveUserInfo({
    //   data: { is_active: 0 },
    // })
    //   .then(() => {
    //     logout();
    //     navigate(`/`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div>
      {loading && <LoadingIndicator />}
      <DebugStates fieldValues={fieldValues} />

      {profile && (
        <>
          <p>ID : {profile.user_id}</p>
          <p>Name : {profile.username}</p>
          <p>Nickname : {profile.user_nickname}</p>
          <p>Birth : {profile.user_birth}</p>
          <p>Telephone : {profile.user_tel}</p>
          <p>Genre : {profile.user_genre}</p>
        </>
      )}

      <Link
        to={`/profile/${user_id}/edit/`}
        className="hover:text-green-500 mr-3"
      >
        수정
      </Link>

      <button className="hover:text-green-500 mr-3" onClick={handleSubmit}>
        탈퇴
      </button>
    </div>
  );
}

export default ProfileDetail;
