import { createContext, useCallback, useContext } from 'react';
import useLocalStorage from 'Base/hooks/useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

const AuthContext = createContext();

function AuthProvider({ children }) {
  // 공유할 상탯값을 정의
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({
      access,
      refresh,
      user_id,
      username,
      is_staff,
      is_superuser,
      is_active,
      user_nickname,
    }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        user_id,
        username,
        user_nickname,
        is_staff,
        is_superuser,
        is_active,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  // 하위 컴포넌트에서 공유할 값/함수들을 value로 지정합니다.

  return (
    <AuthContext.Provider value={[auth, setAuth, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
