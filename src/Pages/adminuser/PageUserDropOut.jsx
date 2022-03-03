import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import SideNavAdmin from 'SideNavAdmin';
import UserDropOut from 'Components/adminuser/UserDropOut';

function PageUserDropOut() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5">
      <div>
        <SideNavAdmin />
      </div>

      <div className="grid col-span-4 auto-rows-max">
        <h1 className=" pt-7 text-xl font-bold">탈퇴회원관리</h1>
        <UserDropOut />
      </div>
    </div>
  );
}

export default PageUserDropOut;
