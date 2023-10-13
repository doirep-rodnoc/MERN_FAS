import styles from "./Topbar.module.css";
import { useAuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuthContext();
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <div className={styles.logo}>会計システム(仮)</div>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.menu}>
          <a href="#" className={styles.menuItem}>
            設定
          </a>
          {user ? (
            <div className={styles.menuItem} onClick={logout}>
              ログアウト
            </div>
          ) : (
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={styles.menuItem}>
                ログイン
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
