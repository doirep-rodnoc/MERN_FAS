import styles from "./MyBooks.module.css"
import Topbar from '../../components/topbar/Topbar'
import BookList from '../../components/bookList/BookList'

export default function MyBooks() {
  return (
    <>
        <Topbar/>
        <div className={styles.myBooksWrapper}>
            <BookList/>
        </div>
    </>
  )
}
