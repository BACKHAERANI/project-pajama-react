import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'Base/api/base';
import LoadingIndicator from 'Components/LoadingIndicator';
import { useAuth } from 'Base/Context/AuthContext';

function QnaDetail({ qna_num }) {
  const [auth] = useAuth();
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
          <hr className=" border-t border-gray-300 " />
          <div className="grid grid-cols-6   border border-gray-300 ">
            <div className="bg-gray-200">
              <label className=" mt-4 flex justify-center ">제목</label>
            </div>
            <div className="col-span-3">
              <p className=" col-start-3 my-4 ml-4 mr-0 w-10/12">{qna.title}</p>
            </div>

            <div className="bg-gray-200">
              <label className=" mt-4 flex justify-center ">작성일</label>
            </div>
            <div>
              <p className=" col-start-3 my-4 ml-4 mr-0  w-10/12">
                {qna.registration_date.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="border border-t-0 border-gray-300">
            <div className="col-span-6 pl-8 pt-6">
              {qna.content.split(/[\r\n]/).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="col-span-6 pl-8 py-6 max-h-full max-w-full">
              {qna.img && (
                <img
                  className="max-w-3xl max-h-full"
                  src={qna.img}
                  alt={qna.title}
                />
              )}
            </div>
            <div className="text-sm bg-gray-200 m-5 ">
              <div className=" p-10 pb-5 text-center ">
                <p className=" pt-2 rounded-3xl bg-gray-50 w-32 h-8 ">
                  관리자 답변
                </p>
              </div>

              <div className="p-10 pt-0">{qna.answer}</div>
            </div>
          </div>
        </div>
      )}

      <div className=" flex justify-end p-1 mt-3  text-sm align-middle">
        <button
          className="w-24 h-8 ml-2  bg-white rounded-sm text-gray-500 border border-gray-300 "
          disabled={deleteLoading}
          onClick={handleDlete}
        >
          삭제
        </button>
        {auth.is_superuser && (
          <>
            <button
              className="w-24 h-8 ml-2 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
              onClick={() => navigate(`/qna/${qna_num}/edit/`)}
            >
              답변
            </button>
          </>
        )}

        <div className=" ml-2 pr-1  align-middle flex justify-end">
          <Link
            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            type="button"
            to="/qna/"
          >
            <h1 className="text-center mt-1.5 text-sm">목록</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QnaDetail;
