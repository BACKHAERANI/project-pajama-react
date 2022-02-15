import { useApiAxios } from '../../Base/api/base';
import { useAuth } from '../../Base/Context/AuthContext';
import { useEffect, useState } from 'react';
import ClothesSummary from './ClothesSummary';
import ReactPaginate from 'react-paginate';
import '../../Base/css/Pagination.css';
import StateCategory from '../../StateCategory';
// import ClothesCategory from './ClothesCategory';

const STATELIST = [
  'TOP',
  'BLOUSE',
  'DRESS',
  'PANTS',
  'SKIRT',
  'OUTER',
  'ACC & CAP',
];

function ClothesList({ itemsPerPage = 9 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState(STATELIST[0]);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getClothes] = useApiAxios(
    {
      url: `/clothes/api/clothes/?${page ? 'page=' + (page + 1) : ''}${
        query ? '&query=' + query : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    getClothes()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      getClothes();
    }
  };

  return (
    <div>
      카테고리
      <div className="flex">
        {/* <div className="flex">
          <StateCategory
            stateList={STATELIST}
            selected={category}
            setSelected={setCategory}
          />
        </div> */}
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <div className="grid grid-cols-3 grid-rows-3 gap-4 my-20">
        {currentItems &&
          currentItems?.map((clothes) => (
            <ClothesSummary clothes={clothes} key={clothes.clothes_num} />
          ))}
      </div>
      <div className="text-center mb-2">
        <input
          type="text"
          onChange={getQuery}
          placeholder="       제목으로 검색"
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
