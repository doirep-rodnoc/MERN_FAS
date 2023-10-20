import React, { useEffect, useState } from "react";
import styles from "./Transaction.module.css";
import { utcToZonedTime, format } from "date-fns-tz";
import axios from "axios";
import { transactionProps, userType } from "../../types";
import { Link, useNavigate } from "react-router-dom";

export default function Transaction({
  transaction,
}: {
  transaction: transactionProps;
}) {
  const timeZone = "Asia/Tokyo";
  const zonedDate = utcToZonedTime(transaction.date, timeZone);
  const formattedDate = format(zonedDate, "yyyy/MM/dd", { timeZone });
  const formattedTime = format(zonedDate, "HH:mm", { timeZone });
  const nav = useNavigate();

  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get<userType>(
        `/api/users/${transaction.recordedBy}`,
        {
          withCredentials: true,
        }
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.patch(
      `/api/transactions/${transaction._id}`,
      {
        isPending: false,
      },
      { withCredentials: true }
    );
  };

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.delete(`/api/transactions/${transaction._id}`, {
      withCredentials: true,
    });
  };

  const handleTransactionClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    nav("/transaction/" + transaction._id);
  };

  let amountTextStyle: React.CSSProperties;
  let amountBGStyle: React.CSSProperties;

  if (transaction.isPending) {
    amountBGStyle = { backgroundColor: "#f2ec4d" };
    amountTextStyle =
      transaction.amount > 0 ? { color: "#4CAF50" } : { color: "#F44336" };
  } else if (transaction.amount > 0) {
    amountTextStyle = { color: "#4CAF50" };
    amountBGStyle = { backgroundColor: "#DFF2D8" };
  } else {
    amountTextStyle = { color: "#F44336" };
    amountBGStyle = { backgroundColor: "#FDECEA" };
  }

  return (
    <div className={styles.transaction}>
      <div
        className={styles.transactionWrapper}
        style={amountBGStyle}
        onClick={handleTransactionClick}
      >
        <div className={styles.datetime}>
          <div className={styles.date}>{formattedDate || "----/--/--"}</div>
          <div className={styles.time}>{formattedTime || "--:--"}</div>
        </div>
        <div className={styles.description}>
          <div className={styles.user}>
            <img
              src={user?.imagePath || "/assets/noimage.png"}
              alt=""
              className={styles.userImg}
            />
            <div className={styles.userText}>{user?.name || "Loading..."}</div>
          </div>
          <div className={styles.title}>
            {transaction.title || "名称未設定"}
          </div>
        </div>
        <div className={styles.amount} style={amountTextStyle}>
          {transaction.amount.toLocaleString() + "円" || "0"}
        </div>
      </div>
      {transaction.isPending ? (
        <form action="">
          <div className={styles.pendingControlButtons}>
            <button
              type="submit"
              className={styles.pendingControlButton}
              onClick={handleAccept}
            >
              承認
            </button>
            <button
              type="submit"
              className={styles.pendingControlButton}
              onClick={handleReject}
            >
              却下
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
