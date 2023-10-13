import React, { useEffect, useState } from "react";
import styles from "./Transaction.module.css";
import { utcToZonedTime, format } from "date-fns-tz";
import axios from "axios";
import { transactionProps, userType } from "../../types";

//anyはDB連携後修正する
export default function Transaction({
  transaction,
}: {
  transaction: transactionProps;
}) {
  const timeZone = "Asia/Tokyo";
  const zonedDate = utcToZonedTime(transaction.date, timeZone);
  const formattedDate = format(zonedDate, "yyyy/MM/dd", { timeZone });
  const formattedTime = format(zonedDate, "HH:mm", { timeZone });

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

  let amountTextStyle: React.CSSProperties;
  let amountBGStyle: React.CSSProperties;
  if (transaction.amount > 0) {
    amountTextStyle = { color: "#4CAF50" };
    amountBGStyle = { backgroundColor: "#DFF2D8" };
  } else {
    amountTextStyle = { color: "#F44336" };
    amountBGStyle = { backgroundColor: "#FDECEA" };
  }

  return (
    <div className={styles.transactionWrapper} style={amountBGStyle}>
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
        <div className={styles.title}>{transaction.title || "名称未設定"}</div>
      </div>
      <div className={styles.amount} style={amountTextStyle}>
        {transaction.amount.toLocaleString() + "円" || "0"}
      </div>
    </div>
  );
}
