import ClothesDetail from '../../Components/clothes/ClothesDetail';
import { useParams } from 'react-router-dom';

function PageClothesDetail() {
  return (
    <div>
      <h2>PageClothesDetail</h2>
      <ClothesDetail />

      <h3>리뷰</h3>
    </div>
  );
}

export default PageClothesDetail;
