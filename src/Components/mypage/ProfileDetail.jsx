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
  };
  return (
    <div className="mt-16 flex justify-center">
      <div className="w-2/5">
        {loading && <LoadingIndicator />}

        {profile && (
          <div className="">
            <div className=" bg-white shadow-md border border-gray-200 rounded-lg p-10 ">
              <form className="mb-3 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    ID
                  </label>
                  <p className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    Name
                  </label>
                  <p className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.username}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    NickName
                  </label>
                  <p className="outline-none bg-purple-100  border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_nickname}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    Birth
                  </label>
                  <p className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_birth}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    Telephone
                  </label>
                  <p className="outline-none bg-purple-100  border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_tel}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    Genre
                  </label>
                  <p className="outline-none bg-purple-100  border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_genre}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="mt-3 ml-2 pr-1 inline-block align-middle flex justify-end">
                    <button
                      className="mr-4 text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={handleSubmit}
                    >
                      탈퇴
                    </button>
                    <Link
                      className="text-white bg-purple-300 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      type="button"
                      to={`/profile/${auth.user_id}/edit/`}
                    >
                      <h1 className="text-center text-sm">수정</h1>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetail;
