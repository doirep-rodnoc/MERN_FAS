import React, { useEffect, useState } from "react";
import styles from "./Transaction.module.css";
import { utcToZonedTime, format } from "date-fns-tz";
import axios from "axios";
import { transactionProps, userType } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircleOutline,
  DoNotDisturb,
} from "@mui/icons-material";
import useSWR from "swr";
import { useAuthContext } from "../../AuthContext";

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
  const {user} = useAuthContext();

  const fetchUser = async (url: string) => {
    const res = await axios.get<userType>(url, {
      withCredentials: true,
    });
    return res.data;
  };

  const { data } = useSWR(`/api/users/${transaction.recordedBy}`, fetchUser);

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
              src={data?.imagePath || "/assets/noimage.png"}
              alt=""
              className={styles.userImg}
            />
            <div className={styles.userText}>{data?.name || "Loading..."}</div>
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
              style={{ backgroundColor: "#DFF2D8" }}
            >
              <CheckCircleOutline
                className={styles.pendingControlButtonIconAccept}
              />
              承認
            </button>
            <button
              type="submit"
              className={styles.pendingControlButton}
              onClick={handleReject}
              style={{ backgroundColor: "#FDECEA" }}
            >
              <DoNotDisturb className={styles.pendingControlButtonIconDeny} />
              却下
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
