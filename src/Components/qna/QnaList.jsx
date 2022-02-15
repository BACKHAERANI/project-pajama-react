import { useEffect } from 'react';
import { useApiAxios } from '../../Base/api/base';
import QnaSummary from './QnaSummary';

function QnaList() {
  const [{ data: qnaList, loading, error }, refetch] = useApiAxios(
    { url: '/qna/api/qna/', method: 'GET' },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {qnaList &&
        qnaList.map((qna) => (
          <div>
            <QnaSummary qna={qna} key={qna.qna_num} />
            <hr />
          </div>
        ))}
    </div>
  );
}

export default QnaList;
