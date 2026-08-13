import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

// Wraps <AppLayout /> so every application route redirects to /login when
// there's no session. Simple state today, but the check itself is what
// will matter when it's backed by a real token instead of sessionStorage.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
