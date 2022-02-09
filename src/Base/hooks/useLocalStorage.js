import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const jsonString = window.localStorage.getItem(key);
    try {
      return jsonString ? JSON.parse(jsonString) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  useEffect(() => {
    const jsonString = JSON.stringify(data);
    window.localStorage.setItem(key, jsonString);
  }, [key, data]);

  return [data, setData];
}

export default useLocalStorage;
