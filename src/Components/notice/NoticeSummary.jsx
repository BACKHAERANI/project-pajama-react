import { Link } from 'react-router-dom';

function NoticeSummary({ notice }) {
  return (
    <div className="flex">
      <Link to={`/notice/${notice.notice_num}/`}>{notice.title}</Link>
      <div className="ml-20">{notice?.user_id?.user_nickname}</div>
    </div>
  );
}

export default NoticeSummary;
