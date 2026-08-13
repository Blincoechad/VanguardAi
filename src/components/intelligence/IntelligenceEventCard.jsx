import SeverityBadge from "../ui/SeverityBadge.jsx";
import { formatRelativeTime, formatPercent } from "../../utils/format.js";
import styles from "./IntelligenceEventCard.module.css";

export default function IntelligenceEventCard({ event, sourceName, onClick, compact = false }) {
  return (
    <button type="button" className={styles.card} onClick={onClick ? () => onClick(event) : undefined}>
      <div className={styles.topRow}>
        <SeverityBadge severity={event.severity} />
        <span className={styles.time}>{formatRelativeTime(event.timestamp)}</span>
      </div>
      <div className={styles.title}>{event.title}</div>
      {!compact && <p className={styles.summary}>{event.summary}</p>}
      <div className={styles.metaRow}>
        <span className={styles.source}>{sourceName ?? "Unknown source"}</span>
        <span className={styles.confidence}>{formatPercent(event.confidence)} confidence</span>
      </div>
    </button>
  );
}
