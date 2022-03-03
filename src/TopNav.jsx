import { useAuth } from 'Base/Context/AuthContext';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from 'Base/css/logo.png';

function TopNav() {
  const navigate = useNavigate();
  const [auth, , , logout] = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="my-3">
      <div className="">
        <div>
          <div className="flex justify-end mt-2 md:flex-row md:mt-0 md:mx-1">
            {!auth.isLoggedIn && (
              <>
                <MyLink to="/accounts/login/">로그인</MyLink>

                <MyLink to="/accounts/login/">마이페이지</MyLink>

                <MyLink to="/accounts/login/">장바구니</MyLink>
              </>
            )}

            {auth.isLoggedIn && !auth.is_superuser && (
              <>
                <div className="pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-3">
                  {`함께 해요,  ${auth.user_nickname}님`}
                </div>

                <button
                  className="pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-3
                          hover:text-purple-300 "
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
                <MyLink to="/qna/">마이페이지</MyLink>

                <MyLink to="/cart/">장바구니</MyLink>
              </>
            )}

            {auth.is_superuser && (
              <>
                <div className="pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-3">
                  {`함께 해요,  관리자님`}
                </div>

                <button
                  className="pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-3
                          hover:text-purple-300 "
                  onClick={handleLogout}
                >
                  로그아웃
                </button>

                <MyLink to="/admin/">관리자페이지</MyLink>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <NavLink to="/">
            <img className="w-32" src={logo} alt="logo-img" />
          </NavLink>
        </div>
      </div>

      <div className="flex mt-10 mb-3">
        <div className="text-align: right-1 mr-20 ">
          <Link to="/clothes/" className="font-bold text-gray-800">
            Clothes
          </Link>
        </div>
        <div className="text-align: right-1  mr-20 ">
          <Link to="/community/" className="font-bold text-gray-800">
            Community
          </Link>
        </div>
        <div className="text-align: right-1 mr-20 ">
          <Link to="/notice/" className="font-bold text-gray-800">
            Notice
          </Link>
        </div>
      </div>
      <div className="mb-10 borter-t border-gray-100">
        <hr />
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="flex-justify-between pb-1 text-gray-500 text-xs flex flex-col mt-2 md:flex-row md:mt-0 md:mx-3
      hover:text-purple-300 "
    >
      {children}
    </Link>
  );
}

export default TopNav;
