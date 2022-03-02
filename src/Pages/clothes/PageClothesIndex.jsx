import { useAuth } from 'Base/Context/AuthContext';
import ClothesList from 'Components/clothes/ClothesList';
import { useNavigate } from 'react-router-dom';

function PageClothesIndex() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  if (auth.isLoggedIn) {
    return (
      <div>
        <div className="float-right">
          <button
            onClick={() => navigate('/clothes/new/')}
            className="w-28 h-8 mr-8 mt-10 bg-gray-400 rounded-2xl text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
          >
            빌려줄래요!
          </button>
        </div>

        <ClothesList />
      </div>
    );
  } else {
    return (
      <div>
        <div className="float-right">
          <button
            onClick={() => navigate('/accounts/login/')}
            className="w-28 h-8 mr-8 bg-gray-400 rounded-2xl text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
          >
            빌려줄래요!
          </button>
        </div>

        <ClothesList />
      </div>
    );
  }
}

export default PageClothesIndex;
