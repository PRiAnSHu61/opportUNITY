import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const Layout = () => {
  const { currentUser } = useAuth();
  const { userData, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current User:", currentUser);
    console.log("User Data:", userData);
    console.log("getStarted:", userData?.getStarted);
  }, [userData]);
  

  // Show nothing while loading
  if (loading) return null;

  // If user hasn't completed steps, only render content
  if (!currentUser || !userData?.getStarted) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
