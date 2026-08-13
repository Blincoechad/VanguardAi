import { Inbox } from "lucide-react";
import styles from "./StateMessage.module.css";

export default function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description }) {
  return (
    <div className={styles.wrap}>
      <Icon size={22} className={styles.emptyIcon} aria-hidden="true" />
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}
