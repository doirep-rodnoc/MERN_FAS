import React from "react";
import styles from "./Home.module.css";
import Topbar from "../../components/topbar/Topbar";
import { Book, MenuBook, NoteAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className={styles.homeWrapper}>
        <div className={styles.homeMenu}>
          <Link to={"/books"} style={{"textDecoration": "none"}}>
            <div className={styles.menuItem}>
              <MenuBook className={styles.menuIcon} />
              <div className={styles.menuTitle}>帳簿の確認</div>
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
