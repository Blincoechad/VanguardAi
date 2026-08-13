import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import MobileBottomNav from "./MobileBottomNav.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import { getAlerts } from "../../services/apiService.js";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  // Alert count in the topbar is shared context across every page, so it
  // lives at the layout level rather than being refetched per page.
  const { data: alerts } = useAsyncData(getAlerts, []);
  const activeAlertCount =
    alerts?.filter((a) => a.status === "unacknowledged").length ?? 0;

  return (
    <div className={styles.shell}>
      <div className={styles.sidebarSlot}>
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />
      </div>

      <div className={styles.main}>
        <Topbar activeAlertCount={activeAlertCount} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
