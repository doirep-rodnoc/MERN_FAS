import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();

  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("無効なメールアドレスです。");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません。");
      return;
    }

    try {
      const user = {
        name: username,
        email: email,
        password: password,
      };
      await axios.post("/api/auth/register", user);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h3>新規登録</h3>
          <div className={styles.inputItem}>
            <label htmlFor="username">ユーザネーム:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              minLength={6}
            />
          </div>
          <div className={styles.inputItem}>
            <label htmlFor="confirmPassword">パスワードの確認:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <button type="submit" className={styles.loginButton}>
              新規登録
            </button>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
