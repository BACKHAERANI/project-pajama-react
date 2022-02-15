import ProfileDetail from '../../Components/mypage/ProfileDetail';
import { useParams } from 'react-router-dom';

function PageProfileDetail() {
  const { user_id } = useParams();
  return (
    <>
      <ProfileDetail user_id={user_id} />
    </>
  );
}

export default PageProfileDetail;
