import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import LoadingIndicator from 'Components/LoadingIndicator';
import useFieldValues from 'Base/hooks/useFieldValues';

const initailValues = {};

function AdminUserDetail({ user_id }) {
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

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-2/5">
        {loading && <LoadingIndicator />}

        {profile && (
          <div className="">
            <div className=" bg-white shadow-md border border-gray-200 rounded-lg p-10 ">
              <div className="mb-3 space-y-6">
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
                  <p className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
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
                  <p className="outline-none bg-gray-50  border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_tel}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2 ">
                    Genre
                  </label>
                  <p className="outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg block w-full p-2.5">
                    {profile.user_genre}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserDetail;
