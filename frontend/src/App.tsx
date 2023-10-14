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
          path="/book/:id"
          element={
            <Auth>
              <Book />
            </Auth>
          }
        />
        <Route
          path="/regist/book"
          element={
            <Auth>
              <BookRegist />
            </Auth>
          }
        />
        <Route
          path="/transaction/:id"
          element={
            <Auth>
              <TransactionPage />
            </Auth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
