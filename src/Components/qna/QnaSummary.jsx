import { Link } from 'react-router-dom';

function QnaSummary({ qna }) {
  return (
    <div>
      <Link to={`/qna/${qna.qna_num}/`}>{qna.title}</Link>
    </div>
  );
}

export default QnaSummary;
