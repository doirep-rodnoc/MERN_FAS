import React, { useContext } from "react";
import styles from "./Topbar.module.css";
import { AuthContext } from "../../state/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.logo}>会計システム(仮)</div>
      </div>
      <div className={styles.right}>
        <div className={styles.menu}>
          <a href="#" className={styles.menuItem}>
            設定
          </a>
          {user ? (
            <a href="#" className={styles.menuItem}>
              マイページ
            </a>
          ) : (
            <a href="#" className={styles.menuItem}>
              ログイン
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
