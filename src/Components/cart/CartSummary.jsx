import { Link, useParams } from 'react-router-dom';

function CartSummary({ cart, index }) {
  return (
    <>
      <div className="col-start-2 m-auto">
        <Link to={`/clothes/${cart?.clothes_num.clothes_num}/`}>
          <img
            className="w-24 h-24 object-cover shrink-0"
            src={cart?.clothes_num?.img1}
          />
        </Link>
      </div>

      <div className="col-start-3 col-span-2 m-auto">
        <p>{cart?.clothes_num?.title}</p>
      </div>

      <div className="col-start-6 m-auto">{cart?.clothes_num?.price}won</div>

      <div className="col-start-7 col-span-2 m-auto">
        {cart.rental_date}~{cart.return_date}
      </div>
    </>
  );
}

export default CartSummary;
