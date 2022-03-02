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
        <div className="text-gray-500 text-sm">
          {clothes.user_id.user_nickname}님의 옷장!
        </div>
        <Link to={`/clothes/${clothes.clothes_num}/`}>{clothes.title}</Link>
        <div>{clothes.price}won</div>
      </div>
    </div>
  );
}

export default ClothesSummary;
