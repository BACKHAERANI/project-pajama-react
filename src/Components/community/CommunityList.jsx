import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import ReactPaginate from 'react-paginate';
import 'Base/css/Pagination.css';
import CommunitySummary from './CommunitySummary';

function CommunityList({ itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getCommunity] = useApiAxios(
    {
      url: `/community/api/community/?${
        page ? 'page=' + (page + 1) : 'page=1'
      }${query ? '&query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  useEffect(() => {
    getCommunity()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
        setQuery('');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

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
      <div className="flex my-5">
        <h3 className="flex-none"> 번호</h3>
        <h3 className="grow ml-40"> 제목</h3>
        <h3 className="flex-none mr-40">작성자</h3>
        <h3 className="flex-none mr-5">작성일</h3>
      </div>
      {currentItems?.map((community) => (
        <CommunitySummary community={community} key={community.community_num} />
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

export default CommunityList;
