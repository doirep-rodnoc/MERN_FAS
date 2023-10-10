import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { loginCall } from "../../dispatch";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    // 簡易的なメールアドレスの正規表現
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("無効なメールアドレスです。");
      return;
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h3>ログイン</h3>
          <div className={styles.inputItem}>
            <label htmlFor="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputItem}>
            <label htmlFor="password">パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className={styles.loginButton}>
              ログイン
            </button>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.signup}>
            <button className={styles.signupButton}>新規登録はこちら</button>
          </div>
        </form>
      </div>
    </div>
  );
}