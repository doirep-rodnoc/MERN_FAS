import styles from "./Home.module.css";
import Topbar from "../../components/topbar/Topbar";
import { MenuBook, NoteAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className={styles.homeWrapper}>
        <h2>メニュー</h2>
        <div className={styles.homeMenu}>
          <Link to={"/books"} style={{"textDecoration": "none"}}>
            <div className={styles.menuItem}>
              <MenuBook className={styles.menuIcon} />
              <div className={styles.menuTitle}>帳簿一覧</div>
            </div>
          </Link>
          <Link to={"/regist/book"} style={{"textDecoration": "none"}}>
            <div className={styles.menuItem}>
              <NoteAdd className={styles.menuIcon} />
              <div className={styles.menuTitle}>帳簿の新規作成</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
