import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, placeholder = "Search…", label }) {
  return (
    <label className={styles.wrap}>
      <span className="sr-only">{label ?? placeholder}</span>
      <Search size={15} className={styles.icon} aria-hidden="true" />
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
