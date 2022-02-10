import { useAuth } from './Base/Context/AuthContext';
import { Link } from 'react-router-dom';

function TopNav() {
  const [auth, , , logout] = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="my-3 ">
      <ul className="flex gap-4">
        {!auth.isLoggedIn && (
          <>
            <li>
              <MyLink to="/clothes/">의상대여</MyLink>
            </li>
            <li>
              <MyLink to="/accounts/login/">Login</MyLink>
            </li>
            <li>
              <MyLink to="/accounts/signup/">Signup</MyLink>
            </li>
          </>
        )}

        {auth.isLoggedIn && (
          <>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </ul>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="pb-1 text-gray-500 
      hover:text-purple-300 hover:border-purple-300 border-b-2"
    >
      {children}
    </Link>
  );
}

export default TopNav;
