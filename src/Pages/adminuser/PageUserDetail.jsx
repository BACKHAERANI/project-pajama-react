import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import SideNavAdmin from 'SideNavAdmin';
import UserEdit from 'Components/adminuser/UserEdit';

function PageUserDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <SideNavAdmin />
      <div>
        <div className="flex pt-20 pr-100 text-lg">
          <h1>[ 개인정보 수정 ]</h1>
        </div>
        <div>genre: 팝핀, 브레이킹, 락킹, 왁킹, 힙합, 하우스, 크럼프, 기타</div>

        <div>
          <UserEdit />
        </div>
      </div>
    </div>
  );
}

export default PageUserDetail;
