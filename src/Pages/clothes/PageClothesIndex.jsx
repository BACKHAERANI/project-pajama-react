import ClothesList from '../../Components/clothes/ClothesList';
import ClothesCategory from '../../Components/clothes/ClothesCategory';
import { useNavigate } from 'react-router-dom';

function PageClothesIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <ClothesCategory />
      <div className="float-right my-5 mr-10">
        <button onClick={() => navigate('/clothes/new/')}>빌려줄래요!</button>
      </div>

      <ClothesList />
    </div>
  );
}

export default PageClothesIndex;
