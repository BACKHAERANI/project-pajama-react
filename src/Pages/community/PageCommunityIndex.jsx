import { useNavigate } from 'react-router-dom';
import 'Base/css/Pagination.css';
import { useAuth } from 'Base/Context/AuthContext';
import CommunityList from 'Components/community/CommunityList';

function PageCommunityIndex() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1 className="text-xl mr-40 inline">커뮤니티</h1>
      </div>
      <CommunityList />
      <div className="my-10 mr-10 float-right border-2 border-purple-400 hover:bg-purple-400">
        <button onClick={() => navigate('/community/new/')}>글쓰기</button>
      </div>
    </div>
  );
}

export default PageCommunityIndex;
