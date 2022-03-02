import { useParams } from 'react-router-dom';
import QnaDetail from 'Components/qna/QnaDetail';
import SideNav from 'SideNav';

function PageQnaDetail() {
  const { qna_num } = useParams();

  return (
    <div className="grid grid-cols-5">
      <div>
        <SideNav />
      </div>

      <div className="grid col-span-4 auto-rows-max">
        <h1 className=" pt-10 pb-5 text-xl font-bold">1:1 문의</h1>
        <QnaDetail qna_num={qna_num} />
      </div>
    </div>
  );
}

export default PageQnaDetail;
