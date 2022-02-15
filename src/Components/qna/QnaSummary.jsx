import { Link } from 'react-router-dom';

function QnaSummary({ qna }) {
  return (
    <div className="flex flex-row">
      <div className="basis-1/10">{qna.qna_num}</div>
      <div className="basis-4/10">
        <Link to={`/qna/${qna.qna_num}/`}>{qna.title}</Link>
      </div>
      <div className="basis-3/10">{qna.registration_date}</div>
      <div className="basis-2/10">{qna?.user_nickname?.user_id}</div>
    </div>
  );
}

export default QnaSummary;
