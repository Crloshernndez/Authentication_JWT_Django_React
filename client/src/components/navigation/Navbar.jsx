import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={() => dispatch(logout())} href="#!">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            JWT Django-react auth
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ml-2">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
