import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Intelligence from "./pages/Intelligence/Intelligence.jsx";
import DataSources from "./pages/DataSources/DataSources.jsx";
import Correlations from "./pages/Correlations/Correlations.jsx";
import Alerts from "./pages/Alerts/Alerts.jsx";
import SystemStatus from "./pages/SystemStatus/SystemStatus.jsx";
import Settings from "./pages/Settings/Settings.jsx";

// There is no marketing homepage — "/" just forwards into the app, which
// then either shows the dashboard or bounces to /login depending on
// whether there's a session.
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/sources" element={<DataSources />} />
          <Route path="/correlations" element={<Correlations />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/system" element={<SystemStatus />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
