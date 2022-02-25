import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import SideNavAdmin from 'SideNavAdmin';
import UserDropOut from 'Components/adminuser/UserDropOut';

function PageUserDropOut() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <SideNavAdmin />
      <div>
        <div className="flex pt-20 pr-100 text-lg">
          <h1>탈퇴회원관리</h1>
        </div>
        <UserDropOut />
      </div>
    </div>
  );
}

export default PageUserDropOut;
