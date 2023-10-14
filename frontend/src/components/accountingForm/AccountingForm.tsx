import React, { useState } from "react";
import styles from "./AccountingForm.module.css";
import axios from "axios";
import { transactionProps, userType } from "../../types";
import { useAuthContext } from "../../AuthContext";

const AccountingForm = ({ book }: { book: string | undefined }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    //e.preventDefault();
    var tr_amount;
    if (type === "expense") {
      tr_amount = -amount;
    } else {
      tr_amount = amount;
    }

    if (name && type && amount) {
      console.log({ name, type, amount, description });
      const res = await axios.post<transactionProps>(
        "/api/transactions/register",
        {
          title: name,
          amount: tr_amount,
          description: description,
          book: book,
          recordedBy: user,
        },
        { withCredentials: true }
      );
    } else {
      alert("入力必須項目を全て入力してください。");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formItems}>
        <div className={styles.formItem}>
          <label htmlFor="title" className={styles.formLabel}>名目(必須):</label>
          <input
            id="title"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="title" className={styles.formLabel}>収支(必須):</label>
          <select
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="income">収入</option>
            <option value="expense">支出</option>
          </select>
        </div>

        <div className={styles.formItem}>
          <label htmlFor="amount" className={styles.formLabel}>金額(必須):</label>
          <input
            id="amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="description" className={styles.formLabel}>説明(任意):</label>
          <textarea
            id="description"
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className={styles.submit}>
        登録
      </button>
    </form>
  );
};

export default AccountingForm;
