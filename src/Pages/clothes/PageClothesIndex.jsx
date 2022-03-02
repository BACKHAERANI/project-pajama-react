import { useAuth } from 'Base/Context/AuthContext';
import ClothesList from 'Components/clothes/ClothesList';
import PageLogin from 'Pages/accounts/PageLogin';
import { useNavigate } from 'react-router-dom';

function PageClothesIndex() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  if (auth.isLoggedIn) {
    return (
      <div>
        <div className="float-right my-5 mr-10">
          <button onClick={() => navigate('/clothes/new/')}>빌려줄래요!</button>
        </div>

        <ClothesList />
      </div>
    );
  } else {
    return (
      <div>
        <div className="float-right my-5 mr-10">
          <button onClick={() => navigate('/accounts/login/')}>
            빌려줄래요!
          </button>
        </div>

        <ClothesList />
      </div>
    );
  }
}

export default PageClothesIndex;
