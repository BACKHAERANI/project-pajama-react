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
        <h1 className=" pt-8  text-xl font-bold">1:1 문의</h1>
        <h6 className=" flex justify-end m-1 text-xs text-gray-400">
          * 비방 및 욕설은 관리자에 의해 삭제될 수 있습니다.
        </h6>
        <QnaForm
          qna_num={qna_num}
          handleDidSave={(savedQna) => navigate(`/qna/${savedQna.qna_num}/`)}
        />
      </div>
    </div>
  );
}

export default PageQnaForm;
