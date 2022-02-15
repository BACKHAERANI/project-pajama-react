import ClothesList from '../../Components/clothes/ClothesList';
import { useNavigate } from 'react-router-dom';

function PageClothesIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="float-right my-5 mr-10">
        <button onClick={() => navigate('/clothes/new/')}>빌려줄래요!</button>
      </div>

      <ClothesList />
    </div>
  );
}

export default PageClothesIndex;
