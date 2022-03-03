import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import UserList from 'Components/adminuser/UserList';
import SideNavAdmin from 'SideNavAdmin';

function PageUserIndex() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5">
      <div>
        <SideNavAdmin />
      </div>

      <div className="grid col-span-4 auto-rows-max">
        <h1 className=" pt-7 text-xl font-bold">개인회원관리</h1>
        <UserList />
      </div>
    </div>
  );
}

export default PageUserIndex;
