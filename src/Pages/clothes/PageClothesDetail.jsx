import ClothesDetail from 'Components/clothes/ClothesDetail';
import { useParams } from 'react-router-dom';

function PageClothesDetail() {
  const { clothes_num } = useParams();
  return (
    <div>
      <h2>PageClothesDetail</h2>
      <ClothesDetail clothes_num={clothes_num} />
    </div>
  );
}

export default PageClothesDetail;
