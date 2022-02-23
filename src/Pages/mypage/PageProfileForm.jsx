import ProfileForm from 'Components/mypage/ProfileForm';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from 'SideNav';

function PageProfileForm() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <SideNav />
        <div>
          <div className="flex pt-20 pr-100 text-lg">
            <h1>[ 개인정보 수정 ]</h1>
          </div>
          <div>
            genre: 팝핀, 브레이킹, 락킹, 왁킹, 힙합, 하우스, 크럼프, 기타
          </div>

          <div>
            <ProfileForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageProfileForm;
