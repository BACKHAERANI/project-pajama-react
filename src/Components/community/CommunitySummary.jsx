import { Link } from 'react-router-dom';

function CommunitySummary({ community }) {
  return (
    <div className="flex">
      <div className="flex-none w-10 h-10">
        <Link to={`/community/${community.community_num}/`}>
          [{community.community_num}]
        </Link>
      </div>
      <div className="grow ml-20">
        <Link to={`/community/${community.community_num}/`}>
          {community.title}
        </Link>
      </div>
      <div className="flex-none ml-20">{community?.user_id?.user_nickname}</div>
      <div className="flex-none ml-20">
        {community.registration_date.slice(0, 10)}
      </div>
    </div>
  );
}

export default CommunitySummary;
