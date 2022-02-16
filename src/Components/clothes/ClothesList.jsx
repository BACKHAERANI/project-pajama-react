import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import ClothesSummary from './ClothesSummary';
import ReactPaginate from 'react-paginate';
import 'Base/css/Pagination.css';
import ClothesCategory from './ClothesCategory';

function ClothesList({ itemsPerPage = 9 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState();

  const [{ data, loading, error }, getClothes] = useApiAxios(
    {
      url: `/clothes/api/clothes/`,
      method: 'GET',
    },
    { manual: true },
  );

  const fetchClothes = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        category: category === 'ALL' ? '' : category,
      };

      const { data } = await getClothes({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [category],
  );

  useEffect(() => {
    fetchClothes(1);
  }, [category]);

  const handlePageClick = (event) => {
    fetchClothes(event.selected + 1);
  };

  const search = (e) => {
    // e.preventDefault();

    if (e.key === 'Enter') {
      fetchClothes(1, query);
    }
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <ClothesCategory setCategory={setCategory} />
      <div className="grid grid-cols-3 grid-rows-3 gap-4 my-20">
        {currentItems?.map((clothes) => (
          <ClothesSummary clothes={clothes} key={clothes.clothes_num} />
        ))}
      </div>
      <div className="text-center mb-2">
        <input
          type="text"
          onChange={getQuery}
          placeholder="제목으로 검색할 수 있어요."
          onKeyPress={search}
        />
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
export default ClothesList;
