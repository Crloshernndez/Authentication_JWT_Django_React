import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading || user === null ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading ...</span>
        </div>
      ) : (
        <>
          <h1 className="mb-5">Dashboard</h1>
          <p>User Details</p>
          <ul>
            <li>First Name: {user.data.name}</li>
            <li>Email: {user.data.email}</li>
          </ul>
        </>
      )}
    </>
  );
}
export default Dashboard;
