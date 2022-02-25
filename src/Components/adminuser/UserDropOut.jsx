import { useAuth } from 'Base/Context/AuthContext';
import { useEffect, useState } from 'react';
import { useApiAxios } from 'Base/api/base';
import ReactPaginate from 'react-paginate';
import 'Base/css/Pagination.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function UserDropOut({ user_id, itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: userList, loading, error }, getUser] = useApiAxios(
    {
      url: `/user/api/users/?${page ? 'page=' + (page + 1) : 'page=1'}${
        query ? '&query=' + query : ''
      }`,
      method: 'GET',
    },
    { manual: true },
  );

  const [{ loading: deleteLoading }, deleteuser] = useApiAxios(
    {
      url: `/user/api/users/${user_id}/`,
      method: 'DELETE',
    },
    { manual: true },
  );

  useEffect(() => {
    getUser();
  }, []);

  const changeHandler = (checked, user_id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, user_id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== user_id));
    }
  };

  const checkedDelete = (user_id) => {
    deleteuser({
      url: `/user/api/users/${user_id}/`,
      method: 'DELETE',
    }).then(() => {
      window.location.replace(`/admin/dropout/`);
    });
  };

  const handleDelete = () => {
    checkedInputs.map((user_id) => {
      checkedDelete(user_id);
    });
    setCheckedInputs([]);
  };

  // const handleDelete = () => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     deleteuser().then(() => {
  //       navigate('/admin/');
  //     });
  //   }
  // };

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

  console.log(auth.user_id && auth.username && !auth.is_active);

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
        <h3 className="basis-1/5">번호</h3>
        <h3 className="basis-1/5">아이디</h3>
        <h3 className="basis-1/5">이름</h3>
        <h3 className="basis-1/5">상태</h3>
        <h3 className="basis-1/5">삭제버튼</h3>
      </div>

      {currentItems?.map(
        (user, index) =>
          !user.is_active && (
            <div className="flex flex-row my-5" user={user} key={user.user_id}>
              <div className="basis-1/5 text-lg"> {index + 1} </div>
              <div className="basis-1/5">{user.user_id}</div>
              <div className="basis-1/5">{user.username}</div>
              <div className="basis-1/5">[비활성]</div>
              <input
                id={user.user_id}
                type="checkbox"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, user.user_id);
                }}
                checked={checkedInputs.includes(user.user_id) ? true : false}
              />
              <button
                disabled={deleteLoading}
                onClick={handleDelete}
                className="basis-1/5 hover:text-red-400"
              >
                삭제
              </button>
            </div>
          ),
      )}

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

export default UserDropOut;
