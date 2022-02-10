import { useAuth } from './Base/Context/AuthContext';
import { NavLink, Link } from 'react-router-dom';

function TopNav() {
  const [auth, , , logout] = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="my-3">
      <div className="flex justify-between justify-items-stretch">
        <div>
          <NavLink to="/">
            <img src="img/logo.png" alt="logo-img" />
          </NavLink>
        </div>

        <div>
          <div className="flex justify-end mt-2 md:flex-row md:mt-0 md:mx-1">
            {!auth.isLoggedIn && (
              <>
                <MyLink to="/accounts/login/">로그인</MyLink>

                <MyLink to="/accounts/login/">마이페이지</MyLink>

                <MyLink to="/accounts/login/">장바구니</MyLink>
              </>
            )}

            {auth.isLoggedIn && (
              <>
                <button
                  className="pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1
                          hover:text-purple-300 "
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
                <MyLink to="/accounts//">마이페이지</MyLink>

                <MyLink to="/accounts/login/">장바구니</MyLink>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="text-align: right-1 mt-6 ml-12 ">
          <Link to="/clothes/" className="text-gray-800">
            의상대여
          </Link>
        </div>
        <div className="text-align: right-1 mt-6 ml-12 ">
          <Link to="/clothes/" className="text-gray-800">
            가나다
          </Link>
        </div>
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="flex-justify-between pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1
      hover:text-purple-300 "
    >
      {children}
    </Link>
  );
}

export default TopNav;
