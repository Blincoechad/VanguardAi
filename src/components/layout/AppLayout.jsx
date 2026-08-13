import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import MobileBottomNav from "./MobileBottomNav.jsx";
import { getAlerts, updateAlertStatus } from "../../services/apiService.js";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [alerts, setAlerts] = useState(null);
  const [alertsStatus, setAlertsStatus] = useState("loading");
  const [alertsError, setAlertsError] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const reloadAlerts = useCallback(() => {
    let cancelled = false;
    setAlertsStatus("loading");
    setAlertsError(null);

    getAlerts()
      .then((data) => {
        if (cancelled) return;
        setAlerts(data);
        setAlertsStatus("success");
      })
      .catch((error) => {
        if (cancelled) return;
        setAlertsError(error);
        setAlertsStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cancel = reloadAlerts();
    return cancel;
  }, [reloadAlerts]);

  const handleAlertStatusChange = useCallback(
    async (alertId, status) => {
      setAlerts(
        (currentAlerts) =>
          currentAlerts?.map((alert) =>
            alert.id === alertId ? { ...alert, status } : alert,
          ) ?? currentAlerts,
      );

      try {
        await updateAlertStatus(alertId, status);
      } catch (error) {
        reloadAlerts();
        throw error;
      }
    },
    [reloadAlerts],
  );

  const activeAlertCount =
    alerts?.filter((a) => a.status === "unacknowledged").length ?? 0;
  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.sidebarSlot}>
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>

      <div className={styles.main}>
        <Topbar
          activeAlertCount={activeAlertCount}
          searchQuery={globalSearchQuery}
          onSearchQueryChange={setGlobalSearchQuery}
        />
        <div className={styles.content}>
          <Outlet
            context={{
              alerts,
              alertsStatus,
              alertsError,
              globalSearchQuery,
              theme,
              setTheme,
              toggleTheme,
              reloadAlerts,
              onAlertStatusChange: handleAlertStatusChange,
            }}
          />
        </div>
      </div>

      <MobileBottomNav
        activeAlertCount={activeAlertCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
