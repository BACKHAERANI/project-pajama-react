import { useApiAxios } from '../../Base/api/base';
import { useAuth } from '../../Base/Context/AuthContext';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../Base/css/Pagination.css';
import ReviewSummary from './ReviewSummary';

function ReviewList({ itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getReview] = useApiAxios(
    '/review/api/review_detail/',
    { manual: true },
  );

  useEffect(() => {
    setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
    setCurrentItems(data?.results);
  }, [data]);

  useEffect(() => {
    getReview()
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

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 my-20">
        {currentItems &&
          currentItems?.map((review) => (
            <ReviewSummary review={review} key={review.payment_detail_num} />
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

export default ReviewList;
