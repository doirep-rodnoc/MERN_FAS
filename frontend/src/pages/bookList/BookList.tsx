import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./BookList.module.css";
import Topbar from "../../components/topbar/Topbar";
import { bookType } from "../../types";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import BookItem from "../../components/bookItem/BookItem";

export default function BookList() {
  const [books, setBooks] = useState<bookType[] | null>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const { user } = useAuthContext();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageLimit(Number(event.target.value));
    fetchBooks(page, Number(event.target.value));
  };

  const handlePageChange = (event: React.MouseEvent<HTMLDivElement>) => {
    fetchBooks(
      Number((event.target as HTMLElement).firstChild?.nodeValue),
      pageLimit
    );
    setPage(Number((event.target as HTMLElement).firstChild?.nodeValue));
  };

  const handleLeftArrowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (page !== 1) {
      fetchBooks(page - 1, pageLimit);
      setPage(page - 1);
    }
  };

  const handleRightArrowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (page != Math.floor(total / pageLimit) + 1) {
      fetchBooks(page + 1, pageLimit);
      setPage(page + 1);
    }
  };

  const generatePageSelector: () => React.ReactElement<HTMLDivElement> = () => {
    const totalPages = Math.floor(total / pageLimit) + 1;
    const visiblePages: number[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (page <= 4) {
      // 現在のページ位置が先頭に近い時
      for (let i = 1; i <= 6; i++) {
        visiblePages.push(i);
      }
      visiblePages.push(totalPages - 1, totalPages);
    } else if (page >= totalPages - 3) {
      // 現在のページ位置が末尾に近い時
      visiblePages.push(1, 2);
      for (let i = totalPages - 5; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // In between start and end
      visiblePages.push(
        1,
        2,
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        totalPages - 1,
        totalPages
      );
    }

    return (
      <div className={styles.pageSelector}>
        {visiblePages.map((pagesValue, index) => {
          if (index > 0 && visiblePages[index] - visiblePages[index - 1] > 1) {
            return (
              <React.Fragment key={"ellipsis" + index}>
                <div className={styles.pageEllipsis}>ー</div>
                <div
                  className={styles.pageNumber}
                  onClick={handlePageChange}
                  key={pagesValue}
                  style={
                    page === pagesValue ? { backgroundColor: "#a9c9c3" } : {}
                  }
                >
                  {pagesValue}
                </div>
              </React.Fragment>
            );
          }
          return (
            <div
              className={styles.pageNumber}
              onClick={handlePageChange}
              key={pagesValue}
              style={page === pagesValue ? { backgroundColor: "#a9c9c3" } : {}}
            >
              {pagesValue}
            </div>
          );
        })}
      </div>
    );
  };

  type bookReturnType = {
    total: number;
    page: number;
    limit: number;
    data: bookType[];
  };

  const fetchBooks = async (page?: number, pageLimit?: number) => {
    const res = await axios.get<bookReturnType>("/api/books", {
      params: {
        userId: user?._id,
        page: page,
        limit: pageLimit,
      },
      withCredentials: true,
    });
    console.log(res);
    setBooks(res.data.data);
    setTotal(res.data.total);
    generatePageSelector();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Topbar />
      <div className={styles.bookListWrapper}>
        <div className={styles.limitSelector}>
          表示数:
          <select value={pageLimit} onChange={handleChange}>
            <option key={10} value={10}>
              10
            </option>
            <option key={20} value={20}>
              20
            </option>
            <option key={50} value={50}>
              50
            </option>
            <option key={100} value={100}>
              100
            </option>
          </select>
        </div>
        {books?.map((book) => (
          <BookItem book={book} key={book._id} />
        ))}
        <div className={styles.pageSelector}>
          <div className={styles.leftArrow} onClick={handleLeftArrowClick}>
            &#9664;
          </div>
          <div className={styles.pageSelectorNums}>
            {generatePageSelector()}
          </div>
          <div className={styles.rightArrow} onClick={handleRightArrowClick}>
            &#9654;
          </div>
        </div>
        <div className={styles.limitSelector}>
          表示数:
          <select value={pageLimit} onChange={handleChange}>
            <option key={10} value={10}>
              10
            </option>
            <option key={20} value={20}>
              20
            </option>
            <option key={50} value={50}>
              50
            </option>
            <option key={100} value={100}>
              100
            </option>
          </select>
        </div>
      </div>
    </>
  );
}
