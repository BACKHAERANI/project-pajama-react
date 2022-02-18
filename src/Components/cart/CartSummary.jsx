import { Link, useParams } from 'react-router-dom';

function CartSummary({ cart }) {
  return (
    <div className="flex">
      <Link to={`/clothes/${cart?.clothes_num.clothes_num}/`}>
        <div>{cart?.clothes_num?.title}</div>
        <img className="rounded-full w-40" src={cart?.clothes_num?.img1} />
      </Link>
      <div>{cart?.clothes_num?.price}원</div>
      <div>{cart.rental_date}</div>
      <div>{cart.return_date}</div>
    </div>
  );
}

export default CartSummary;
