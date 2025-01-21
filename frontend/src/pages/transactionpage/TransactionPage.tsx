import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './TransactionPage.module.css';
import Topbar from "../../components/topbar/Topbar";
import { format } from "date-fns";

interface Transaction {
    date: string;
    title: string;
    amount: number;
    description?: string;
    recordedBy: string;
}

export default function TransactionPage() {
  const { id } = useParams<{ id: string }>();

  const fetchTransactionData = async (): Promise<Transaction> => {
    const response = await fetch(`/api/transactions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    return response.json();
  };

  const [transactionData, setTransactionData] = React.useState<Transaction | null>(null);
  React.useEffect(() => {
    fetchTransactionData().then(data => setTransactionData(data));
  }, []);

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(transactionData.date), "yyyy/MM/dd");
  const formattedTime = format(new Date(transactionData.date), "HH:mm");
  return (
    <>
      <Topbar />
      <div className={styles.transactionPageWrapper}>
        <div className={styles.transactionInfo}>
          <h2 className={styles.title}>収支詳細</h2>
          <div className={styles.datetime}>
            <span className={styles.date}>{formattedDate}</span>
            <span className={styles.time}>{formattedTime}</span>
          </div>
          <div className={styles.transactionDetails}>
            <p><strong>件名:</strong> {transactionData.title || '未設定'}</p>
            <p><strong>金額:</strong> {transactionData.amount.toLocaleString()}円</p>
            <p><strong>記録者:</strong> {transactionData.recordedBy}</p>
          </div>
          <div className={styles.description}>
            {transactionData.description || '説明はありません'}
          </div>
          </div>
      </div>
    </>
  );
}
