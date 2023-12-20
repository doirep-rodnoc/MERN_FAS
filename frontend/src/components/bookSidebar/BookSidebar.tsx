import styles from "./BookSidebar.module.css";
import { Add } from "@mui/icons-material";

export default function BookSidebar({ total }: { total: number }) {
  return (
    <div className={styles.bookSidebar}>
      <div className={styles.totalAmount}>
        <label htmlFor="" className={styles.sidebarLabel}>
          合計:
        </label>
        <div className={styles.amount}>{total.toLocaleString()}円</div>
      </div>
      <hr className="sidebarHr" />
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarListItem}>
          <Add className={styles.sidebarListItemIcon} />
          <p className={styles.sidebarListItemText}>収支を追加</p>
        </li>
        <li className={styles.sidebarListItem}>
          <Add className={styles.sidebarListItemIcon} />
          <p className={styles.sidebarListItemText}>収支を追加</p>
        </li>
      </ul>
    </div>
  );
}
