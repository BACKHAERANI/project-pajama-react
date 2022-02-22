import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import ReactPaginate from 'react-paginate';
import 'Base/css/Pagination.css';
import UserSummary from './UserSummary';

function UserList({ itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getUser] = useApiAxios(
    {
      url: `/user/api/users/?${page ? 'page=' + (page + 1) : 'page=1'}${
        query ? '&query=' + query : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  useEffect(() => {
    getUser()
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
          placeholder="아이디로 검색할 수 있어요."
          onKeyPress={search}
        />
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <div className="flex flex-row">
        <h3 className="basis-1/3">아이디</h3>
        <h3 className="basis-1/3">이름</h3>
        <h3 className="basis-1/3">상태</h3>
      </div>
      <div>
        {currentItems?.map((user) => (
          <UserSummary user={user} key={user.user_id} />
        ))}
      </div>
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

export default UserList;