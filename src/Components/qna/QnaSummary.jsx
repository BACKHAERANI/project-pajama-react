import { Link } from 'react-router-dom';

function QnaSummary({ qna, index }) {
  return (
    <>
      <tbody className="border-b border-gray-150">
        <tr>
          <td className="p-4 pl-6">{index + 1}</td>
          <td>
            <Link to={`/qna/${qna.qna_num}/`}>{qna.title}</Link>
          </td>
          <td></td>
          <td className=" pr-5">{qna.registration_date.slice(0, 10)}</td>
          <td className="pl-9">{qna.answer === `답변예정` ? 'X' : 'O'}</td>
        </tr>
      </tbody>
    </>
  );
}

export default QnaSummary;
