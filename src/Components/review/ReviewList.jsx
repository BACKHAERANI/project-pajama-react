import { useApiAxios } from '../../Base/api/base';
import { useEffect, useState } from 'react';
import '../../Base/css/Pagination.css';
import ReviewSummary from './ReviewSummary';

function ReviewList({ itemsPerPage = 10, clothes_num }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getReview] = useApiAxios(
    {
      url: `/review/api/review_detail/?${
        page ? 'page=' + (page + 1) : 'page=1'
      }&query=${clothes_num}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  useEffect(() => {
    getReview()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
        setQuery('');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  return (
    <div>
      <hr className="border-t-2 border-gray-300" />
      <div className="">
        {currentItems?.map((review) => (
          <ReviewSummary review={review} key={review.payment_detail_num} />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
