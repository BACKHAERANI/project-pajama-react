import ProfileCheck from 'Components/mypage/ProfileCheck';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileCheck() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>

        <div className="grid col-span-4 auto-rows-max">
          <h1 className=" pt-10 pb-5 text-xl font-bold">비밀번호 재입력</h1>

          <div>
            <ProfileCheck user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProfileCheck;
