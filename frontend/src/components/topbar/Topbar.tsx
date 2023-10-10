import React from 'react'
import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
        <div className={styles.left}>
            <div className={styles.logo}>
                会計システム(仮)
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.menu}>
                <a href="#" className={styles.menuItem}>設定</a>
                <a href="#" className={styles.menuItem}>ログイン</a>
            </div>
        </div>
    </div>
  )
}
