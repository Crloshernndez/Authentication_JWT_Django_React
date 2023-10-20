import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRegistered, login, getUser } from "../../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const { loading, isAuthenticated, registered, isError, message, isSuccess } =
    useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    email: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (registered) dispatch(resetRegistered());
  }, [isError, isSuccess, message]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login({ email, password }));
    dispatch(getUser());

    if (isError) {
      setFormData({
        ...formData,
        error: message,
      });
    }
  };

  if (isAuthenticated && !loading) return <Navigate to="/dashboard" />;

  return (
    <div className="container mt-5">
      <h1>Sing In</h1>
      <p>Sing Into Your Session Auth Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">email: </label>
          <input
            className="form-control"
            type="email"
            placeholder="email*"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            minLength="6"
            required
          />
        </div>
        {/* Muestra el mensaje de error */}
        {formData.error && <p className="text-danger">{formData.error}</p>}{" "}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading ...</span>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        )}
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}
export default Login;
