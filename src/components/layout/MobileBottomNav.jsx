import { NavLink } from "react-router-dom";
import { mobileNavItems } from "../navigation/navItems.js";
import styles from "./MobileBottomNav.module.css";

// Purpose-built for mobile: five destinations, big touch targets, icon over
// label, fixed to the bottom, safe-area aware. Not a shrunken sidebar.
export default function MobileBottomNav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {mobileNavItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
        >
          <Icon size={20} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
