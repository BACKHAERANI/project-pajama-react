import ProfileCheck from 'Components/mypage/ProfileCheck';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileCheck() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <SideNav />
        <div>
          <div className="flex pt-20 pr-100 text-lg">
            <h1>[ Password Check ]</h1>
          </div>

          <div>
            <ProfileCheck user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProfileCheck;
