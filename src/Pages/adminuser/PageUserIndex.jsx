import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import UserList from 'Components/adminuser/UserList';
import SideNavAdmin from 'SideNavAdmin';

function PageUserIndex() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <SideNavAdmin />
      <div>
        <div className="flex pt-20 pr-100 text-lg">
          <h1>개인회원관리</h1>
        </div>
        <UserList />
      </div>
    </div>
  );
}

export default PageUserIndex;
