import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthModal from "../../components/AuthModal";


import { Outlet } from "react-router-dom";
import ScrollTop from "../../components/ScrollTop";
import MainContextProvider from "../../components/Context/MainContext";
import AuthContextProvider from "../../components/Context/AuthContext";
import Header from "../../components/Header";
import OverplayMoblile from "../../components/Overplay";

const MainLayout = () => {
  // const [isShowNavbar, setIsShowNavbar] = useState(false);

  // const handleShowNavbar = (isShow) => {
  //   setIsShowNavbar(isShow);
  // };
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />

          <Outlet />

          <Footer />
        </div>
        <AuthModal />
        <OverplayMoblile />
        <Navbar />
        <ScrollTop />

      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
