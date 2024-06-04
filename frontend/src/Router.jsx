import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Pages/Home/home";
import User from "./Pages/User/User";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/login"

export default function Router() {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route
          path="/login"
          element={isConnected ? <Login /> : <Navigate to="/user" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}