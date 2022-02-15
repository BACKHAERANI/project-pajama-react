import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from '../../Base/api/base';
import { useAuth } from '../../Base/Context/AuthContext';
import LoadingIndicator from '../LoadingIndicator';

function ProfileDetail({ user_id }) {
  const [auth] = useAuth();
  const navigate = useNavigate;

  const [{ data: profile, loading, error }, refetch] = useApiAxios(
    {
      url: `/mypage/api/profile/${user_id}/detail/`,
      headers: { Authorization: `Bearer ${auth.access}` },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteProfile] =
    useApiAxios(
      {
        url: `/mypage/api/profile/${user_id}/detail/`,
        method: 'DELETE',
        headers: { Authorization: `Bearer` },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      deleteProfile().then();
      navigate('/');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>탈퇴 중</LoadingIndicator>}
      {error &&
        `loading error(${deleteError.response.status} ${deleteError.response.statusText})`}
      {deleteError &&
        `탈퇴 요청 중 에러 발생(${deleteError.response.status} ${deleteError.response.statusText})`}
      {profile && (
        <>
          <p>{profile.user_id}</p>
          <p>{profile.user_name}</p>
          <p>{profile.user_nickname}</p>
          <p>{profile.user_birth}</p>
          <p>{profile.user_tel}</p>
          <p>{profile.user_genre}</p>
        </>
      )}

      <Link
        to={`/mypage/profile/${user_id}/edit/`}
        className="hover:text-green-500 mr-3"
      >
        수정
      </Link>

      <button
        disabled={deleteLoading}
        className="hover:text-green-500 mr-3"
        onClick={handleDelete}
      >
        탈퇴
      </button>
    </div>
  );
}

export default ProfileDetail;
