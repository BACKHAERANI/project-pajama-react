import { Link } from 'react-router-dom';

function ClothesSummary({ clothes }) {
  return (
    <div>
      {clothes.img1 && (
        <img
          src={clothes.img1}
          alt={clothes.title}
          className="w-40 h-40 rounded inline"
        />
      )}
      <Link to={`/clothes/${clothes.id}/`}>
        {clothes.title}[{clothes.price}]
      </Link>
    </div>
  );
}

export default ClothesSummary;
