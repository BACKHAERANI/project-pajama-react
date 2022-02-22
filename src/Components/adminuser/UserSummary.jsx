import { Link } from 'react-router-dom';

function UserSummary({ user }) {
  return (
    <div className="flex">
      <div className="flex-none w-10 h-10">
        <Link to={`/admin/${user.user_id}/edit`}>{user.user_id}</Link>
      </div>
      <div className="flex-none ml-20">{user.username}</div>
      <div className="flex-none ml-20">{user.is_active}</div>
    </div>
  );
}

export default UserSummary;
