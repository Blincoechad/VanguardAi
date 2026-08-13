import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

// Wraps authService in React state so components re-render on login/logout
// instead of having to poll sessionStorage themselves.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep state in sync if the session changes in another tab.
  useEffect(() => {
    const onStorage = () => setSession(authService.getSession());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // This handles logging in and updates the app state once the user is authenticated.
  async function login(credentials) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.login(credentials);
      setSession(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // This creates a new account, then saves the returned session so the user is logged in right away.
  async function signUp(details) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.signUp(details);
      setSession(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // This clears the user's session through the service and updates React state to show they are logged out.
  async function logout() {
    await authService.logout();
    setSession(null);
  }

  // This is the shared auth data and helper functions that any component using this context can access.
  const value = {
    user: session?.user ?? null,
    isAuthenticated: Boolean(session),
    isLoading,
    error,
    login,
    signUp,
    logout,
  };

  // This provider wraps child components so they can use the authentication state and actions.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This custom hook gives components an easy way to access auth context and catches incorrect usage.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
