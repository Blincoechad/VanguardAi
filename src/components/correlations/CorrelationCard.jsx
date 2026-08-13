import { ArrowDown } from "lucide-react";
import { formatRelativeTime, formatPercent } from "../../utils/format.js";
import styles from "./CorrelationCard.module.css";

// Renders the correlation as a simple vertical chain (event → event → source)
// per the project brief's request for something understandable rather than
// an elaborate network graph.
export default function CorrelationCard({ correlation, eventTitles, sourceNames }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{correlation.title}</span>
        <span className={styles.confidence}>{formatPercent(correlation.confidence)} confidence</span>
      </div>

      <div className={styles.chain}>
        {eventTitles.map((title, i) => (
          <div key={i} className={styles.chainItem}>
            <div className={styles.chainNode}>{title}</div>
            {i < eventTitles.length - 1 && <ArrowDown size={13} className={styles.chainArrow} aria-hidden="true" />}
          </div>
        ))}
        {sourceNames.length > 0 && (
          <div className={styles.chainItem}>
            <ArrowDown size={13} className={styles.chainArrow} aria-hidden="true" />
            <div className={styles.chainNodeMuted}>{sourceNames.join(", ")}</div>
          </div>
        )}
      </div>

      <p className={styles.explanation}>{correlation.explanation}</p>

      <div className={styles.footer}>Detected {formatRelativeTime(correlation.detectedAt)}</div>
    </div>
  );
}
