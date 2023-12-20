import React, { useState } from "react";
import styles from "./BookRegist.module.css";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookRegist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません。");
      return;
    }

    try {
      const res = await axios.post(
        "/api/books/register",
        { title: title, password: password, description: description },
        { withCredentials: true }
      );
      nav("/book/" + res.data._id);
    } catch (error) {}
  };

  return (
    <>
      <Topbar />
      <div className={styles.bookRegist}>
        <div className={styles.bookRegistBox}>
          <form
            className={styles.bookRegistForm}
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <h3>帳簿の新規作成</h3>
            <div className={styles.inputItem}>
              <label htmlFor="title">帳簿のタイトル:</label>
              <p className={styles.description}></p>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputItem}>
              <label htmlFor="description">帳簿の説明(任意):</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.inputItem}>
              <label htmlFor="password">帳簿のパスワード:</label>
              <p className={styles.description}></p>
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
              <label htmlFor="confirmPassword">帳簿のパスワード(確認):</label>
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
              <button type="submit" className={styles.submitButton}>
                作成する
              </button>
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
