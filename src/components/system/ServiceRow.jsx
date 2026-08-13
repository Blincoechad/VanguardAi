import StatusBadge from "../ui/StatusBadge.jsx";
import { formatRelativeTime } from "../../utils/format.js";
import styles from "./ServiceRow.module.css";

export default function ServiceRow({ service }) {
  return (
    <div className={styles.row}>
      <div className={styles.name}>{service.name}</div>
      <StatusBadge status={service.status} />
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Uptime</span>
        <span className={styles.metricValue}>{service.uptime}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Latency</span>
        <span className={styles.metricValue}>{service.latencyMs}ms</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Last poll</span>
        <span className={styles.metricValue}>{formatRelativeTime(service.lastPoll)}</span>
      </div>
    </div>
  );
}
