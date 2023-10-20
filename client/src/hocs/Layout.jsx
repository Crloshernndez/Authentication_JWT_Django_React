import React from "react";
import { useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import { checkAuthentication } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(checkAuthentication());
  });

  return (
    <div>
      <Navbar />
      <div className="container mt-5">{children}</div>
    </div>
  );
};

export default Layout;
