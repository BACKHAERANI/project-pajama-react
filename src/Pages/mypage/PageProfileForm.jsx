import ProfileForm from 'Components/mypage/ProfileForm';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileForm() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>

        <div className="grid col-span-4 auto-rows-max">
          <h1 className=" pt-8  text-xl font-bold">개인정보 수정</h1>
          <ProfileForm />
        </div>
      </div>
    </>
  );
}

export default PageProfileForm;
