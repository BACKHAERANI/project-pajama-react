import ProfileDetail from 'Components/mypage/ProfileDetail';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileDetail() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>

        <div className="grid col-span-4 auto-rows-max">
          <h1 className="pt-10 text-xl font-bold">개인정보확인💡</h1>

          <div>
            <ProfileDetail user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProfileDetail;
