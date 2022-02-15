import ClothesDetail from 'Components/clothes/ClothesDetail';
import { useParams } from 'react-router-dom';

function PageClothesDetail() {
  const { clothesId } = useParams();
  return (
    <div>
      <h2>PageClothesDetail</h2>
      <ClothesDetail clothesId={clothesId} />
    </div>
  );
}

export default PageClothesDetail;
