import styles from "./FilterBar.module.css";

// `filters` is an array of { key, label, value, options: [{value,label}], onChange }
export default function FilterBar({ filters }) {
  return (
    <div className={styles.wrap}>
      {filters.map((f) => (
        <label key={f.key} className={styles.field}>
          <span className={styles.label}>{f.label}</span>
          <select
            className={styles.select}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
          >
            {f.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
