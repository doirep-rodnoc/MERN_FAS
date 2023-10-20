import React from "react";
import styles from "./BookList.module.css";
import Topbar from "../../components/topbar/Topbar";

export default function BookList() {
  return (
    <>
      <Topbar />
      <div className={styles.bookListWrapper}></div>
    </>
  );
}
