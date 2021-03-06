import { Link } from 'react-router-dom';
import noneimg from 'Base/css/noneimg.jpg';

function ClothesSummary({ clothes }) {
  return (
    <div>
      <div className="">
        <Link to={`/clothes/${clothes.clothes_num}/`}>
          {clothes.img1 && (
            <img
              src={clothes.img1}
              alt={clothes.title}
              className=" w-80 h-96 object-cover shrink-0 rounded inline"
            />
          )}
        </Link>
        <Link to={`/clothes/${clothes.clothes_num}/`}>
          {!clothes.img1 && (
            <img
              src={noneimg}
              alt="noneimg"
              className="w-80 h-96 object-cover shrink-0 rounded inline "
            />
          )}
        </Link>
      </div>
      <div className="flex justify-between pt-2">
        <div>
          <Link
            className="font-semibold"
            to={`/clothes/${clothes.clothes_num}/`}
          >
            {clothes.title}
          </Link>
        </div>
      </div>
      <div className="mb-8">{clothes.price}won</div>
    </div>
  );
}

export default ClothesSummary;
