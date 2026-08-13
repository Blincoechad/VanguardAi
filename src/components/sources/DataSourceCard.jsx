import { Globe } from "lucide-react";
import StatusBadge from "../ui/StatusBadge.jsx";
import { formatRelativeTime } from "../../utils/format.js";
import styles from "./DataSourceCard.module.css";

export default function DataSourceCard({ source }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.nameRow}>
          <Globe size={15} className={styles.icon} aria-hidden="true" />
          <span className={styles.name}>{source.name}</span>
        </div>
        <StatusBadge status={source.status} />
      </div>

      <div className={styles.type}>{source.type}</div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Last checked</dt>
          <dd>{formatRelativeTime(source.lastChecked)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Polling interval</dt>
          <dd>{source.pollingInterval}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Events detected</dt>
          <dd>{source.eventsDetected.toLocaleString()}</dd>
        </div>
      </dl>
    </div>
  );
}
