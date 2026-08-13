import { NavLink } from "react-router-dom";
import { Bell, ShieldHalf } from "lucide-react";
import SearchBar from "../ui/SearchBar.jsx";
import styles from "./Topbar.module.css";

export default function Topbar({
  activeAlertCount = 0,
  searchQuery = "",
  onSearchQueryChange = () => {},
}) {
  return (
    <header className={styles.topbar}>
      <div className={styles.mobileBrand}>
        <ShieldHalf size={18} className={styles.brandIcon} aria-hidden="true" />
        <span>VANGUARD</span>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="Search articles, sources, or keywords"
        label="Search articles, sources, or keywords"
      />

      <NavLink to="/alerts" className={styles.alertsLink}>
        <Bell size={16} aria-hidden="true" />
        <span className={styles.alertsLabel}>Alerts</span>
        {activeAlertCount > 0 && (
          <span className={styles.badge}>{activeAlertCount}</span>
        )}
      </NavLink>
    </header>
  );
}
