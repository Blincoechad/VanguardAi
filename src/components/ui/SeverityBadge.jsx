import styles from "./Badges.module.css";

const LABELS = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

// Severity is communicated with both a label and a colored dot — never
// color alone — so it still reads for anyone who can't distinguish the hues.
export default function SeverityBadge({ severity }) {
  const level = severity?.toLowerCase() ?? "low";
  return (
    <span className={`${styles.badge} ${styles[level] ?? styles.low}`}>
      <span className={styles.dot} aria-hidden="true" />
      {LABELS[level] ?? severity}
    </span>
  );
}
