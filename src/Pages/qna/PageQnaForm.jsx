import { useNavigate, useParams } from 'react-router-dom';
import QnaForm from 'Components/qna/QnaForm';
import SideNav from 'SideNav';

function PageQnaForm() {
  const navigate = useNavigate();
  const { qna_num } = useParams();

  return (
    <div className="grid grid-cols-5">
      <div>
        <SideNav />
      </div>

      <div className="grid col-span-4 auto-rows-max">
        <h1 className=" pt-10 pb-5 text-xl font-bold">1:1 문의</h1>
        <QnaForm
          qna_num={qna_num}
          handleDidSave={(savedQna) => navigate(`/qna/${savedQna.qna_num}/`)}
        />
      </div>
    </div>
  );
}

export default PageQnaForm;
