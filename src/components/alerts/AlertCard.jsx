import { CheckCircle2, Circle, Archive } from "lucide-react";
import SeverityBadge from "../ui/SeverityBadge.jsx";
import { formatRelativeTime } from "../../utils/format.js";
import styles from "./AlertCard.module.css";

const STATUS_CONFIG = {
  unacknowledged: { icon: Circle, label: "Unacknowledged" },
  acknowledged: { icon: CheckCircle2, label: "Acknowledged" },
  resolved: { icon: Archive, label: "Resolved" },
};

export default function AlertCard({ alert, onAcknowledge, onResolve }) {
  const statusInfo = STATUS_CONFIG[alert.status] ?? STATUS_CONFIG.unacknowledged;
  const StatusIcon = statusInfo.icon;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <SeverityBadge severity={alert.severity} />
        <span className={styles.time}>{formatRelativeTime(alert.time)}</span>
      </div>

      <div className={styles.title}>{alert.title}</div>
      <div className={styles.trigger}>{alert.trigger}</div>

      <div className={styles.bottomRow}>
        <span className={styles.source}>{alert.source}</span>
        <span className={styles.status}>
          <StatusIcon size={13} aria-hidden="true" />
          {statusInfo.label}
        </span>
      </div>

      {alert.status !== "resolved" && (
        <div className={styles.actions}>
          {alert.status === "unacknowledged" && (
            <button type="button" className={styles.actionButton} onClick={() => onAcknowledge?.(alert.id)}>
              Acknowledge
            </button>
          )}
          <button type="button" className={styles.actionButtonPrimary} onClick={() => onResolve?.(alert.id)}>
            Resolve
          </button>
        </div>
      )}
    </div>
  );
}
