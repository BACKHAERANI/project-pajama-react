import ProfileDetail from 'Components/mypage/ProfileDetail';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileDetail() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <SideNav />
        <div>
          <div className="flex pt-20 pr-100 text-lg">
            <h1>[ Profile ]</h1>
          </div>

          <div>
            <ProfileDetail user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProfileDetail;
