import "./App.css";
import Book from "./pages/book/Book";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionPage from "./pages/transactionpage/TransactionPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/transaction/:id" element={<TransactionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
