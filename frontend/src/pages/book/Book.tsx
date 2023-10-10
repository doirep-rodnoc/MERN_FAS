import React from 'react'
import styles from "./Book.module.css";
import Topbar from '../../components/topbar/Topbar';
import TransactionList from '../../components/transactionList/TransactionList';
import { useParams } from 'react-router-dom';

export default function Book() {
  const {id} = useParams<{id:string}>()
  return (
    <>
        <Topbar/>
        <div className={styles.bookWrapper}>
            <TransactionList bkId={id || ""}/>     
        </div>
    </>
  )
}
