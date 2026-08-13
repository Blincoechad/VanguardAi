import { NavLink } from "react-router-dom";
import {
  ShieldHalf,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  SunMedium,
  MoonStar,
} from "lucide-react";
import { navItems } from "../navigation/navItems.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Sidebar.module.css";

export default function Sidebar({
  collapsed,
  onToggleCollapsed,
  theme,
  onToggleTheme,
}) {
  const { user, logout } = useAuth();
  const isDark = theme === "dark";

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <ShieldHalf
            size={20}
            className={styles.brandIcon}
            aria-hidden="true"
          />
          {!collapsed && <span className={styles.brandName}>VANGUARD</span>}
        </div>
        <button
          type="button"
          className={styles.collapseButton}
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Icon size={17} aria-hidden="true" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        {!collapsed && user && (
          <div className={styles.userBlock}>
            <div className={styles.userName}>{user.email || user.name}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        )}

        <button
          type="button"
          className={styles.themeButton}
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={!isDark}
        >
          {isDark ? (
            <SunMedium size={16} aria-hidden="true" />
          ) : (
            <MoonStar size={16} aria-hidden="true" />
          )}
          {!collapsed && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
        </button>

        <button type="button" className={styles.logoutButton} onClick={logout}>
          <LogOut size={16} aria-hidden="true" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
