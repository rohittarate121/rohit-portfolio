import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import {
  getStoredToken,
  setStoredToken,
  clearStoredToken,
} from "../utils/authStorage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    apiClient
      .get("/auth/me")
      .then(({ data }) => setUser(data))
      .catch(() => {
        // Stored token didn't hold up — don't leave a dead one sitting around.
        clearStoredToken();
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const login = (newToken) => {
    setStoredToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearStoredToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
