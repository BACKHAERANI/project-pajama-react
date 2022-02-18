import CartForm from 'Components/cart/CartForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageCartForm({ clothes_num }) {
  const navigate = useNavigate();

  return (
    <CartForm
      clothes_num={clothes_num}
      handleDidSave={(savedCart) => navigate(`/cart/`)}
    />
  );
}

export default PageCartForm;
