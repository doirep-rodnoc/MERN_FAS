import "./App.css";
import Book from "./pages/book/Book";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TransactionPage from "./pages/transactionpage/TransactionPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
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
          <Route path="/book/:id" element={user ? <Book /> : <Login />} />
          <Route
            path="/transaction/:id"
            element={user ? <TransactionPage /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
