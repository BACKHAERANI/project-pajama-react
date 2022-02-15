import { Link } from 'react-router-dom';

function ClothesSummary({ clothes }) {
  return (
    <div>
      <Link to={`/clothes/${clothes.clothes_num}/`}>
        {clothes.img1 && (
          <img
            src={clothes.img1}
            alt={clothes.title}
            className="w-35 h-35 rounded inline"
          />
        )}
      </Link>
      <div className="grid">
        <Link to={`/clothes/${clothes.clothes_num}/`}>{clothes.title}</Link>
        <Link to={`/clothes/${clothes.clothes_num}/`}>[{clothes.price}원]</Link>
      </div>
    </div>
  );
}

export default ClothesSummary;
