import { Loader2 } from "lucide-react";
import styles from "./StateMessage.module.css";

export default function LoadingState({ label = "Loading…" }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <Loader2 size={18} className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
