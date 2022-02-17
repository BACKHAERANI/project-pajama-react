import CommunityDetail from 'Components/community/CommunityDetail';
import { useParams } from 'react-router-dom';

function PageCommunityDetail() {
  const { community_num } = useParams();

  return (
    <div>
      <CommunityDetail community_num={community_num} />
    </div>
  );
}

export default PageCommunityDetail;
