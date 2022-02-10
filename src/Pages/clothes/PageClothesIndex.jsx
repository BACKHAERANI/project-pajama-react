import ClothesList from '../../Components/clothes/ClothesList';
import ClothesCategory from '../../Components/clothes/ClothesCategory';
import { useNavigate } from 'react-router-dom';

function PageClothesIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>의상대여</h2>
      <ClothesCategory />
      <button onClick={() => navigate('/clothes/new/')}>빌려줄래요!</button>

      <ClothesList />
    </div>
  );
}

export default PageClothesIndex;
