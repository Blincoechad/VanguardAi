import { formatRelativeTime } from "../../utils/format.js";
import styles from "./ActivityFeed.module.css";

export default function ActivityFeed({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.text}>{item.text}</span>
          <span className={styles.time}>{formatRelativeTime(item.time)}</span>
        </li>
      ))}
    </ul>
  );
}
