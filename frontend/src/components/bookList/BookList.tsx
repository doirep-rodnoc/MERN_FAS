import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./BookList.module.css";
import { bookType } from "../../types";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import BookItem from "../bookItem/BookItem";
import useSWR from "swr";

export default function BookList() {
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const { user } = useAuthContext();

  type bookReturnType = {
    total: number;
    page: number;
    limit: number;
    data: bookType[];
  };

  const fetchBooks = async (url: string) => {
    const res = await axios.get<bookReturnType>(url, {
      params: {
        userId: user?._id,
      },
      withCredentials: true,
    });
    console.log(res);
    generatePageSelector();
    return res.data;
  };

  const { data, error, isLoading, mutate } = useSWR(`/api/books?page=${page}&limit=${pageLimit}`, fetchBooks);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageLimit(Number(event.target.value));
    mutate();
  };

  const handlePageChange = (event: React.MouseEvent<HTMLDivElement>) => {
    setPage(Number((event.target as HTMLElement).firstChild?.nodeValue));
    mutate();
  };

  const handleLeftArrowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (page !== 1) {
      setPage(page - 1);
      mutate();
    }
  };

  const handleRightArrowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    var total = 0;
    if (data?.total !== undefined) {
      total = data.total;
    }
    if (page != Math.floor(total / pageLimit) + 1) {
      setPage(page + 1);
      mutate();
    }
  };

  const generatePageSelector: () => React.ReactElement<HTMLDivElement> = () => {
    var total = 0;
    if (data?.total !== undefined) {
      total = data.total;
    }
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

  return (
    <div className={styles.bookList}>
      <h2>{user?.name} さんの帳簿一覧</h2>
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
        {data?.data.map((book) => (
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
    </div>
  );
}
