import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import SideNavAdmin from 'SideNavAdmin';
import QnaList from 'Components/qna/QnaList';

function PageAdminQna() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <SideNavAdmin />
      <div>
        <div className="flex pt-20 pr-100 text-lg">
          <h1>[ QnA ]</h1>
        </div>
        <QnaList />
      </div>
    </div>
  );
}

export default PageAdminQna;
