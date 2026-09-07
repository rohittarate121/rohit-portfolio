// One shared place for the token's storage key, so apiClient.js and
// useAuth.jsx can't drift out of sync on what key they're each using.
const TOKEN_KEY = "portfolio_admin_token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}
