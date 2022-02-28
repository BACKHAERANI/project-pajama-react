import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import QnaSummary from './QnaSummary';
import ReactPaginate from 'react-paginate';
import { useAuth } from 'Base/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function QnaList({ itemsPerPage = 10 }) {
  const [auth] = useAuth();
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [{ data: qnaList, loading, error }, getQna] = useApiAxios(
    {
      url: `/qna/api/qna/?${page ? 'page=' + (page + 1) : 'page=1'}${
        query ? '&query=' + query : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );
  const navigate = useNavigate();

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  // 리로드 값 변경 때마다 엑시오스 함수 호출

  useEffect(() => {
    getQna()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
        setQuery('');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  // 페이지 클릭 이벤트

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  // 쿼리 이벤트

  const search = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      setQuery(value);
      setPage(0);
      setReload((prevState) => !prevState);
    }
  };

  if (auth.isLoggedIn && auth.is_superuser) {
    return (
      <>
        {qnaList &&
          qnaList.map((qna, index) => <QnaSummary qna={qna} key={index} />)}
      </>
    );
  } else if (auth.isLoggedIn && !auth.is_superuser) {
    return (
      <>
        <table className="border-t-2  border-gray-150 w-full text-xs">
          <thead className="border-b font-semibold border-gray-150">
            <tr>
              <td className="p-5 text-justify">번호</td>
              <td className="p-5 text-center">제목</td>
              <td className="p-5 text-right">
                <div className="mr-6">등록일</div>
              </td>
            </tr>
          </thead>

          {qnaList &&
            qnaList
              .filter((qna) => qna.user_id.user_id === auth.user_id)
              .map((qna, index) => (
                <>
                  <QnaSummary qna={qna} key={qna.qna_num} index={index} />
                </>
              ))}
          <tfoot className="my-10"></tfoot>
        </table>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          pageRangeDisplayed={itemsPerPage}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
        />
        <div className="p-4 pt-7 pr-1 text-sm text-right inline-block align-middle">
          <button
            className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
            onClick={() => navigate('/qna/new/')}
          >
            글쓰기
          </button>
        </div>
      </>
    );
  }
}

export default QnaList;
