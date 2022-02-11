import { useEffect, useState } from 'react';
import { useApiAxios } from '../../Base/api/base';
import NoticeSummary from './NoticeSummary';
import { useAuth } from '../../Base/Context/AuthContext';

function NoticeList() {
  const [query, setQuery] = useState();
  const [auth] = useAuth();
  const [{ data: NoticeList, loading, error }, refetch] = useApiAxios(
    {
      url: `/notice/api/notice/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [auth]);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div>
      <div className="text-right mb-2">
        <input
          type="text"
          onChange={getQuery}
          placeholder="제목으로 검색할 수 있어요."
          onKeyPress={search}
        />
      </div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {NoticeList &&
        NoticeList?.map((notice) => (
          <NoticeSummary notice={notice} key={notice.notice_num} />
        ))}
    </div>
  );
}

export default NoticeList;
