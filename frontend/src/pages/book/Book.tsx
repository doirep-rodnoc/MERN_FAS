import { useEffect, useState } from "react";
import styles from "./Book.module.css";
import Topbar from "../../components/topbar/Topbar";
import TransactionList from "../../components/transactionList/TransactionList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import {
  AddTask,
  AdminPanelSettings,
  PostAdd,
  Settings,
} from "@mui/icons-material";
import AccountingForm from "../../components/accountingForm/AccountingForm";

export default function Book() {
  const { id } = useParams<{ id: string }>();
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookDescription, setBookDescription] = useState<string>("");
  const [adminUsers, setAdminUsers] = useState<[string]>([""]);
  const [nomalUsers, setNomalUsers] = useState<[string]>([""]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [usedAmount, setUsedAmount] = useState<number>(0);
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { user } = useAuthContext();

  const fetchBookData = async (id: string | undefined) => {
    const res = await axios.get("/api/books/" + id, { withCredentials: true });
    setBookTitle(res.data.title);
    setBookDescription(res.data.description);
    setAdminUsers(res.data.adminUser);
    setNomalUsers(res.data.nomalUser);
    setTotalAmount(res.data.totalAmount);
    setUsedAmount(res.data.usedAmount);
    setIncomeAmount(res.data.incomeAmount);
  };

  useEffect(() => {
    fetchBookData(id);
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  if (user !== undefined && user !== null) {
    if (adminUsers.includes(user._id)) {
      return (
        // 管理者ユーザログイン時の表示
        <>
          <Topbar />
          <div className={styles.bookWrapper}>
            <div className={styles.bookInfo}>
              <div className={styles.bookInfoHead}>
                <h1 className={styles.bookTitle}>{bookTitle}</h1>
                <p className={styles.bookDescription}>{bookDescription}<br/>あなたはこの帳簿の管理者です。</p>
              </div>
              <div className={styles.bookInfoMenu}>
                <div className={styles.bookInfoMenuItems}>
                  <div
                    className={styles.bookInfoMenuItem}
                    onClick={() => handleItemClick(1)}
                  >
                    <PostAdd className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>収支の登録</p>
                  </div>
                  <div
                    className={styles.bookInfoMenuItem}
                    onClick={() => handleItemClick(2)}
                  >
                    <AddTask className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>
                      収支申請リスト
                    </p>
                  </div>
                  <div className={styles.bookInfoMenuItem}>
                    <AdminPanelSettings
                      className={styles.bookInfoMenuItemIcon}
                    />
                    <p className={styles.bookInfoMenuItemText}>
                      ユーザー管理
                    </p>
                  </div>
                  <div className={styles.bookInfoMenuItem}>
                    <Settings className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>その他の設定</p>
                  </div>
                </div>
                {selectedItem === 1 && (
                  <div
                    className={
                      selectedItem
                        ? styles.relatedContent
                        : styles.relatedContentHidden
                    }
                  >
                    <AccountingForm book={id} />
                  </div>
                )}
                {selectedItem === 2 && (
                  <div
                    className={
                      selectedItem
                        ? styles.relatedContent
                        : styles.relatedContentHidden
                    }
                  >
                    <TransactionList bkId={id || ""} pending={true}/>
                  </div>
                )}
              </div>
            </div>
            <TransactionList bkId={id || ""} pending={false} />
          </div>

          <div className={styles.summary}>
            <div className={styles.income}>
              収入計: {incomeAmount ? incomeAmount.toLocaleString() : "0"}円
            </div>
            <div className={styles.expense}>
              支出計: {usedAmount ? usedAmount.toLocaleString() : "0"}円
            </div>
            <div className={styles.total}>
              合計金額: {totalAmount ? totalAmount.toLocaleString() : "0"}円
            </div>
          </div>
        </>
      );
    } else if (nomalUsers.includes(user._id)) {
      return (
        // 一般ユーザログイン時の表示
        <>
          <Topbar />
          <div className={styles.bookWrapper}>
            <div className={styles.bookInfo}>
              <div className={styles.bookInfoHead}>
                <h1 className={styles.bookTitle}>{bookTitle}</h1>
                <p className={styles.bookDescription}>{bookDescription}</p>
              </div>
              <div className={styles.bookInfoMenu}>
                <div className={styles.bookInfoMenuItems}>
                  <div
                    className={styles.bookInfoMenuItem}
                    onClick={() => handleItemClick(1)}
                  >
                    <PostAdd className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>収支の申請</p>
                  </div>
                  <div
                    className={styles.bookInfoMenuItem}
                    onClick={() => handleItemClick(2)}
                  >
                    <AddTask className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>
                      収支申請リスト
                    </p>
                  </div>
                  <div className={styles.bookInfoMenuItem}>
                    <AdminPanelSettings
                      className={styles.bookInfoMenuItemIcon}
                    />
                    <p className={styles.bookInfoMenuItemText}>
                      ユーザー管理
                    </p>
                  </div>
                  <div className={styles.bookInfoMenuItem}>
                    <Settings className={styles.bookInfoMenuItemIcon} />
                    <p className={styles.bookInfoMenuItemText}>その他の設定</p>
                  </div>
                </div>
                {selectedItem === 1 && (
                  <div
                    className={
                      selectedItem
                        ? styles.relatedContent
                        : styles.relatedContentHidden
                    }
                  >
                    <AccountingForm book={id} />
                  </div>
                )}
                {selectedItem === 2 && (
                  <div
                    className={
                      selectedItem
                        ? styles.relatedContent
                        : styles.relatedContentHidden
                    }
                  >
                    <TransactionList bkId={id || ""} pending={true}/>
                  </div>
                )}
              </div>
            </div>
            <TransactionList bkId={id || ""} pending={false} />
          </div>

          <div className={styles.summary}>
            <div className={styles.income}>
              収入計: {incomeAmount ? incomeAmount.toLocaleString() : "0"}円
            </div>
            <div className={styles.expense}>
              支出計: {usedAmount ? usedAmount.toLocaleString() : "0"}円
            </div>
            <div className={styles.total}>
              合計金額: {totalAmount ? totalAmount.toLocaleString() : "0"}円
            </div>
          </div>
        </>
      );
    } else {
      return (
        // 未登録ユーザ時の表示
        <>
          <Topbar />
        </>
      );
    }
  }
}
