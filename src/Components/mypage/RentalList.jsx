import { useApiAxios } from 'Base/api/base';
import { useAuth } from 'Base/Context/AuthContext';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from 'SideNav';
import ReactPaginate from 'react-paginate';

function RentalList({ itemsPerPage = 10 }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [query, setQuery] = useState();
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [{ data: payment_detail, loading, error }, refetch] = useApiAxios(
    { url: '/payment/api/payment_detail/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch()
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

  return (
    <div className="flex">
      <SideNav />

      {payment_detail &&
        payment_detail
          ?.filter((List) => List.payment_num.user_id.user_id === auth.user_id)
          .map((check) => {
            return (
              <div className="grid col-span-4 auto-rows-max">
                <h1 className=" pt-8  text-xl font-bold">대여내역</h1>
                <div
                  className="grid grid-cols-5 grid-rows-5 border-t"
                  key={check.payment_detail_num}
                >
                  <div className="row-span-1 col-span-1 border-gray-300">
                    <img className="h-20 w-20" src={check.clothes_num.img1} />
                  </div>
                  <div className="row-span-1 col-span-1">
                    {check.clothes_num.title}
                  </div>
                  <div className="row-span-2 col-span-2">
                    {check.clothes_num.price}원
                  </div>
                  <div className=" flex justify-end p-1  text-sm align-middle">
                    <button
                      className="w-24 h-8 bg-gray-400 rounded-sm text-white transition duration-300 ease-in-out hover:bg-white hover:border hover:border-gray-400 hover:text-gray-600"
                      onClick={() =>
                        navigate(`/review/${check.payment_detail_num}/new/`)
                      }
                    >
                      리뷰쓰기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

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

export default RentalList;
