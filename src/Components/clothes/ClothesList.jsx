import { useApiAxios } from '../../Base/api/base';
import { useAuth } from '../../Base/Context/AuthContext';
import { useEffect, useState } from 'react';
import ClothesSummary from './ClothesSummary';
import { Link, useNavigate } from 'react-router-dom';

function ClothesList() {
  const [query, setQuery] = useState('');
  const [{ data: clothesList }, refetch] = useApiAxios(
    {
      url: `/clothes/api/clothes/`,
      method: 'GET',
    },
    { manual: true },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('ENTER');
      const value = e.target.value;
      setQuery(value);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="my-5 items-end">
        {clothesList && (
          <div className="flex flex-row my-20">
            {clothesList.map((clothes) => (
              <div key={clothes.clothes_num}>
                <ClothesSummary clothes={clothes} />
              </div>
            ))}
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </>
  );
}

export default ClothesList;
