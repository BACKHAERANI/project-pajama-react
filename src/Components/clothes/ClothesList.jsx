import { useApiAxios } from '../../Base/api/base';
import { useEffect } from 'react';
import ClothesSummary from './ClothesSummary';

function ClothesList() {
  const [{ data: clothesList, loading, error }, refetch] = useApiAxios(
    '/clothes/api/clothes/',
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="my-5 ">
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {clothesList && (
        <div>
          {clothesList.map((clothes) => (
            <div key={clothes.id}>
              <ClothesSummary clothes={clothes} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClothesList;
