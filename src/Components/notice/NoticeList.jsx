import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import NoticeSummary from './NoticeSummary';
import ReactPaginate from 'react-paginate';
import 'Base/css/Pagination.css';
import { useNavigate } from 'react-router-dom';

function NoticeList({ itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const [{ data, loading, error }, getNotice] = useApiAxios(
    {
      url: `/notice/api/notice/?${page ? 'page=' + (page + 1) : 'page=1'}${
        query ? '&query=' + query : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );

  // 페이지가 바뀔 때마다 리로드 값 변경

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  // 리로드 값 변경 때마다 엑시오스 함수 호출

  useEffect(() => {
    getNotice()
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

  return (
    <div>
      <div className="text-right mb-2">
        <input
          className="w-80 h-10"
          type="search"
          name="search"
          placeholder="제목으로 검색할 수 있어요."
          onKeyPress={search}
        />
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {currentItems?.map((notice) => (
        <NoticeSummary notice={notice} key={notice.notice_num} />
      ))}
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
    </div>
  );
}

export default NoticeList;
