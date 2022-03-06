import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import CommunityList from 'Components/community/CommunityList';
import LoginForm from 'Components/accounts/LoginForm';

function PageCommunityIndex() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  if (auth.isLoggedIn) {
    return (
      <div>
        <div>
          <h1 className="pt-8  text-xl font-bold">커뮤니티</h1>
        </div>
        <CommunityList />
        <div className="flex justify-end">
          <button
            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600 "
            onClick={() => navigate('/community/new/')}
          >
            글쓰기
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="">
          <p className=" text-sm text-center text-indigo-800">
            커뮤니티는 로그인 후 이용 가능합니다.{' '}
          </p>
        </div>

        <LoginForm />
      </div>
    );
  }
}

export default PageCommunityIndex;
