import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./Components/Header";
// import Footer from "./Components/Footer";

import Home from "./Pages/Home/home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default Router;