import "./App.css";
import Book from "./pages/book/Book";
import Home from "./pages/home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import TransactionPage from "./pages/transactionpage/TransactionPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./AuthContext";
import Auth from "./components/Auth";
import BookRegist from "./pages/bookregist/BookRegist";
import MyBooks from "./pages/myBooks/MyBooks";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/books"
          element={
            user ? (
              <Auth>
                <MyBooks />
              </Auth>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/book/:id"
          element={
            user ? (
              <Auth>
                <Book />
              </Auth>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/regist/book"
          element={
            user ? (
              <Auth>
                <BookRegist />
              </Auth>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/transaction/:id"
          element={
            user ? (
              <Auth>
                <TransactionPage />
              </Auth>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
