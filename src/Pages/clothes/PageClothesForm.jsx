import ClothesForm from 'Components/clothes/ClothesForm';
import { useParams } from 'react-router-dom';

function PageClothesForm() {
  const { clothes_num } = useParams();
  return (
    <div>
      <ClothesForm clothes_num={clothes_num} />
    </div>
  );
}

export default PageClothesForm;
