import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;