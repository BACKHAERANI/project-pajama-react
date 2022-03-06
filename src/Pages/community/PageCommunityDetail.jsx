import CommunityDetail from 'Components/community/CommunityDetail';
import { useParams } from 'react-router-dom';

function PageCommunityDetail() {
  const { community_num } = useParams();

  return (
    <div>
      <div>
        <h1 className="pt-8 pb-5  text-xl font-bold">커뮤니티</h1>
      </div>

      <CommunityDetail community_num={community_num} />
    </div>
  );
}

export default PageCommunityDetail;
