import { useNavigate } from 'react-router-dom';
import QnaList from 'Components/qna/QnaList';
import SideNav from 'SideNav';

function PageQnaIndex() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5">
      <div>
        <SideNav />
      </div>

      <div className="grid col-span-4 auto-rows-max">
        <h1 className=" pt-10 pb-5 text-xl font-bold">1:1 문의</h1>

        <QnaList />
      </div>
    </div>
  );
}

export default PageQnaIndex;
