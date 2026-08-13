import { AlertTriangle } from "lucide-react";
import styles from "./StateMessage.module.css";

export default function ErrorState({ title = "Couldn't load this data", description, onRetry }) {
  return (
    <div className={styles.wrap}>
      <AlertTriangle size={22} className={styles.errorIcon} aria-hidden="true" />
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
