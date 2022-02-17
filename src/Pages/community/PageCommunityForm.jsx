import CommunityForm from 'Components/community/CommunityForm';
import { useParams } from 'react-router-dom';

function PageCommunityForm() {
  const { community_num } = useParams();

  return (
    <div>
      <CommunityForm community_num={community_num} />
    </div>
  );
}

export default PageCommunityForm;
