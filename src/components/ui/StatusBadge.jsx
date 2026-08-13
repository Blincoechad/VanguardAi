import styles from "./Badges.module.css";

const LABELS = {
  online: "Online",
  degraded: "Degraded",
  offline: "Offline",
  new: "New",
  investigating: "Investigating",
  resolved: "Resolved",
  acknowledged: "Acknowledged",
  unacknowledged: "Unacknowledged",
};

// Maps arbitrary status strings onto one of our three semantic buckets so
// new status values from a future backend still render sensibly.
function toBucket(status) {
  const s = status?.toLowerCase();
  if (["online", "resolved", "acknowledged"].includes(s)) return "online";
  if (["degraded", "investigating", "new"].includes(s)) return "degraded";
  if (["offline", "unacknowledged"].includes(s)) return "offline";
  return "low";
}

export default function StatusBadge({ status }) {
  const bucket = toBucket(status);
  return (
    <span className={`${styles.badge} ${styles[bucket]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {LABELS[status?.toLowerCase()] ?? status}
    </span>
  );
}
