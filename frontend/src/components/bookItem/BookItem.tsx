import styles from "./BookItem.module.css";
import { utcToZonedTime, format } from "date-fns-tz";
import { bookType } from "../../types";
import { useNavigate } from "react-router-dom";

export default function BookItem({ book }: { book: bookType }) {
  const timeZone = "Asia/Tokyo";
  const zonedDate = utcToZonedTime(book.date, timeZone);
  const formattedDate = format(zonedDate, "yyyy/MM/dd", { timeZone });
  const nav = useNavigate();

  const handleBookClick = async () => {
    nav("/book/" + book._id);
  };

  return (
    <div className={styles.bookWrapper} onClick={handleBookClick}>
      <div className={styles.datetime}>
        <div className={styles.date}>作成日</div>
        <div className={styles.date}>{formattedDate || "----/--/--"}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{book.title || "名称未設定"}</div>
      </div>
    </div>
  );
}
