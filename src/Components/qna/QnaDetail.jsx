import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';

function QnaDetail({ qna_num }) {
  const navigate = useNavigate();
  const [{ data: qna, loading, error }, refetch] = useApiAxios(
    { url: `/qna/api/qna/${qna_num}/`, method: 'GET' },
    { manual: true },
  );
  const [{ loading: deleteLoading, error: deleteError }, deleteQna] =
    useApiAxios(
      { url: `/qna/api/qna/${qna_num}/`, method: 'DELETE' },
      { manual: true },
    );

  const handleDlete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteQna().then();
      navigate('/qna/');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중</LoadingIndicator>}
      {error &&
        `로딩중 에러 발생(${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러 발생(${deleteError.response.status} ${deleteError.response.statusText})`}
      {qna && (
        <>
          <h3>{qna.title}</h3>
          {qna.img && <img src={qna.img} alt={qna.title} />}
          <div>
            {qna.content.split(/[\r\n]/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </>
      )}

      <Link to="/qna/">목록</Link>
      <Link to={`/qna/${qna_num}/edit/`}>수정</Link>
      <button disabled={deleteLoading} onClick={handleDlete}>
        삭제
      </button>
    </div>
  );
}

export default QnaDetail;
