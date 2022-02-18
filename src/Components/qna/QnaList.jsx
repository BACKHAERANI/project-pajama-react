import { useEffect } from 'react';
import { useApiAxios } from 'Base/api/base';
import QnaSummary from './QnaSummary';
import { useAuth } from 'Base/Context/AuthContext';

function QnaList() {
  const [auth] = useAuth();
  const [{ data: qnaList, loading, error }, refetch] = useApiAxios(
    { url: '/qna/api/qna/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  if (auth.isLoggedIn && auth.is_superuser) {
    return (
      <div>
        {qnaList &&
          qnaList.map((qna) => (
            <div>
              <QnaSummary qna={qna} key={qna.qna_num} />
            </div>
          ))}
      </div>
    );
  } else if (auth.isLoggedIn && !auth.is_superuser) {
    return (
      <div>
        {qnaList &&
          qnaList
            .filter((qna) => qna.user_id.user_id === auth.user_id)
            .map((qna) => (
              <div>
                <QnaSummary qna={qna} key={qna.qna_num} />
                <hr />
              </div>
            ))}
      </div>
    );
  }
}

export default QnaList;
