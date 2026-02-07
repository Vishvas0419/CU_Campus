import { createContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cu_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (token) {
          const me = await authApi.getMe();
          if (!cancelled) setUser(me);
        } else {
          if (!cancelled) setUser(null);
        }
      } catch (e) {
        localStorage.removeItem('cu_token');
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login(username, password) {
    const res = await authApi.login({ username, password });
    localStorage.setItem('cu_token', res.token);
    setToken(res.token);
  }

  async function register(payload) {
    const res = await authApi.register(payload);
    localStorage.setItem('cu_token', res.token);
    setToken(res.token);
  }

  function logout() {
    localStorage.removeItem('cu_token');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout, refreshMe: () => authApi.getMe().then(setUser) }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

