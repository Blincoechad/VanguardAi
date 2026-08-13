import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut, MoonStar, SunMedium } from "lucide-react";
import { mobileMoreItems, mobileNavItems } from "../navigation/navItems.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./MobileBottomNav.module.css";

// Purpose-built for mobile: five destinations, big touch targets, icon over
// label, fixed to the bottom, safe-area aware. Not a shrunken sidebar.
const MORE_ACTIVE_ROUTES = new Set(mobileMoreItems.map(({ to }) => to));

export default function MobileBottomNav({
  activeAlertCount = 0,
  theme = "dark",
  onToggleTheme = () => {},
}) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const triggerRef = useRef(null);
  const wasMoreOpenRef = useRef(false);
  const isMoreActive = MORE_ACTIVE_ROUTES.has(pathname);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isMoreOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMoreOpen]);

  useEffect(() => {
    if (wasMoreOpenRef.current && !isMoreOpen) {
      triggerRef.current?.focus();
    }

    wasMoreOpenRef.current = isMoreOpen;
  }, [isMoreOpen]);

  const closeMoreMenu = () => {
    setIsMoreOpen(false);
  };

  const handleLogout = async () => {
    closeMoreMenu();
    await logout();
  };

  return (
    <>
      {isMoreOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close more navigation menu"
          onClick={closeMoreMenu}
        />
      )}

      <nav className={styles.nav} aria-label="Primary">
        {mobileNavItems.map(({ to, label, icon: Icon }) => {
          if (to === "/more") {
            return (
              <button
                key={to}
                ref={triggerRef}
                type="button"
                className={`${styles.item} ${isMoreOpen || isMoreActive ? styles.active : ""}`}
                aria-expanded={isMoreOpen}
                aria-haspopup="dialog"
                aria-controls="mobile-more-menu"
                onClick={() => setIsMoreOpen((open) => !open)}
              >
                <span className={styles.iconWrap}>
                  <Icon size={20} aria-hidden="true" />
                  {!isMoreOpen && activeAlertCount > 0 && (
                    <span className={styles.badge}>{activeAlertCount}</span>
                  )}
                </span>
                <span className={styles.label}>{label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <Icon size={20} aria-hidden="true" />
              <span className={styles.label}>{label}</span>
            </NavLink>
          );
        })}

        <div
          id="mobile-more-menu"
          className={`${styles.sheet} ${isMoreOpen ? styles.sheetOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="More navigation menu"
        >
          <div className={styles.sheetHandle} aria-hidden="true" />
          <div className={styles.sheetHeaderRow}>
            <div className={styles.sheetHeader}>More</div>
            <button
              type="button"
              className={styles.themeButton}
              onClick={onToggleTheme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              aria-pressed={!isDark}
            >
              {isDark ? (
                <SunMedium size={16} aria-hidden="true" />
              ) : (
                <MoonStar size={16} aria-hidden="true" />
              )}
            </button>
          </div>
          <div className={styles.sheetItems}>
            {mobileMoreItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${styles.sheetItem} ${isActive ? styles.sheetItemActive : ""}`
                }
                onClick={closeMoreMenu}
              >
                <Icon size={18} aria-hidden="true" />
                <span className={styles.sheetItemLabel}>
                  <span>{label}</span>
                  {isMoreOpen && to === "/alerts" && activeAlertCount > 0 && (
                    <span className={styles.badge}>{activeAlertCount}</span>
                  )}
                </span>
              </NavLink>
            ))}
            <button
              type="button"
              className={`${styles.sheetItem} ${styles.logoutItem}`}
              onClick={handleLogout}
            >
              <LogOut size={18} aria-hidden="true" />
              <span className={styles.sheetItemLabel}>
                <span>Log out</span>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
