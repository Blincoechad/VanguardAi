import styles from "./MetricCard.module.css";

// A single number-plus-label card. Icon is optional so this can also be
// used for plain text metrics like "2 / 3".
export default function MetricCard({ label, value, icon: Icon, tone = "default", hint }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        {Icon && <Icon size={16} className={styles.icon} aria-hidden="true" />}
      </div>
      <div className={`${styles.value} ${styles[tone]}`}>{value}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
}
