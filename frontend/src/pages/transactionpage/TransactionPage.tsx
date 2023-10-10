import React from "react";
import styles from "./TransactionPage.module.css";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";

export default function TransactionPage() {
  const {id} = useParams<{id:string}>();
  return (
    <>
      <Topbar />
      <div className={styles.transactionPageWrapper}>{id}</div>
    </>
  );
}
