import { useNavigate } from 'react-router-dom';
import new1 from 'Base/css/001.png';
import new2 from 'Base/css/002.png';
import new3 from 'Base/css/003.png';
import new4 from 'Base/css/004.png';
import new5 from 'Base/css/005.png';
import new6 from 'Base/css/006.png';

function PageMain() {
  const navigate = useNavigate();
  return (
    <div className="">
      <div>
        <img
          className="animate-fadeIn"
          src="img/main891.png"
          alt="main"
          onClick={() => navigate('/ourstory/')}
        ></img>
      </div>
      <div className="mt-32">
        <p className="mb-20 font-bold text-2xl text-center">
          이번 주 인기 상품
        </p>
        <div
          className="relative overflow-hidden cursor-pointer"
          onClick={() => navigate('/clothes/81/')}
        >
          <div className="flex flex-row animate-slider">
            <img src={new1} alt="html logo" />
            <img src={new2} alt="html logo" />
            <img src={new3} alt="html logo" />
            <img src={new4} alt="html logo" />
            <img src={new5} alt="html logo" />
            <img src={new6} alt="html logo" />
            <img src={new1} alt="html logo" />
            <img src={new2} alt="html logo" />
            <img src={new3} alt="html logo" />
            <img src={new4} alt="html logo" />
            <img src={new5} alt="html logo" />
            <img src={new6} alt="html logo" />
            <img src={new1} alt="html logo" />
            <img src={new2} alt="html logo" />
            <img src={new3} alt="html logo" />
            <img src={new4} alt="html logo" />
            <img src={new5} alt="html logo" />
            <img src={new6} alt="html logo" />
            <img src={new1} alt="html logo" />
            <img src={new2} alt="html logo" />
            <img src={new3} alt="html logo" />
            <img src={new4} alt="html logo" />
            <img src={new5} alt="html logo" />
            <img src={new6} alt="html logo" />
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}

export default PageMain;
