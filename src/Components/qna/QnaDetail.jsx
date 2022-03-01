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
        <div>
          <hr className=" border-t border-gray-400" />

          <div className="col-span-4">
            <label className="bg-gray-100 font-medium pr-20 ">제목</label>
            <p className=" col-start-3 my-4 ml-4 mr-0 p-1 w-10/12">
              {qna.title}
            </p>
          </div>
          <div className="col-span-4">
            <label className="bg-gray-100 font-medium pr-20 ">작성일</label>
            <p className=" col-start-3 my-4 ml-4 mr-0 p-1 w-10/12">
              {qna.registration_date.slice(0, 10)}
            </p>
          </div>

          {qna.img && (
            <img
              className="max-w-3xl max-h-full"
              src={qna.img}
              alt={qna.title}
            />
          )}
          <div>
            {qna.content.split(/[\r\n]/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="bg-gray-200">{qna.answer}</div>
        </div>
      )}
      <div>
        <div className="p-4 pt-7 pr-1 text-sm text-right inline-block align-middle">
          <button
            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            disabled={deleteLoading}
            onClick={handleDlete}
          >
            <Link to="/qna/">목록</Link>
          </button>
        </div>
      </div>
      <div className="p-4 pt-7 pr-1 text-sm text-right inline-block align-middle">
        <button
          className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
          disabled={deleteLoading}
          onClick={handleDlete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default QnaDetail;
