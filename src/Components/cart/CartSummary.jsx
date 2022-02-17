import { Link, useParams } from 'react-router-dom';

function CartSummary({ cart }) {
  return (
    <div>
      <div>{cart.cart_num}</div>
      <Link to={`/clothes/${cart?.clothes_num.clothes_num}/`}>
        <img className="rounded-full w-40" src={cart?.clothes_num?.img1} />
        <div>{cart?.clothes_num?.title}</div>
      </Link>
      <div>{cart.rental_date}</div>
      <div>{cart.return_date}</div>
    </div>
  );
}

export default CartSummary;
