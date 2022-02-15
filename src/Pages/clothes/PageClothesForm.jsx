import ClothesForm from 'Components/clothes/ClothesForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageClothesForm() {
  const navigate = useNavigate();

  const { clothesId } = useParams();
  return (
    <ClothesForm
      clothesId={clothesId}
      handledDidSave={(savedPost) => navigate(`/clothes/${savedPost.id}/`)}
    />
  );
}

export default PageClothesForm;
