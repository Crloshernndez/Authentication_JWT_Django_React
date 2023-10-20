import axios from "axios";
import Cookies from "js-cookie";

const REGISTER_URL = "/api/users/register/";
const LOGIN_URL = "/api/token/";
const VERIFY_URL = "/api/token/verify/";
const GETUSER_URL = "/api/users/me/";

// Register user
const register = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(REGISTER_URL, userData, config);
  return response.data;
};

// Login user
const login = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(LOGIN_URL, userData, config);

  if (response.data) {
    Cookies.set("access", response.data.access, {
      expires: 1,
      // path: "/api/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    Cookies.set("refresh", response.data.refresh, {
      expires: 1,
      // path: "/api/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response.data;
};

// Logout user
const logout = async () => {
  Cookies.set("access", "", {
    expires: new Date(0),
    // path: "/api/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  Cookies.set("refresh", "", {
    expires: new Date(0),
    // path: "/api/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// Get user
const getUser = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${Cookies.get("access")}`,
    },
  };

  const response = await axios.get(GETUSER_URL, config);

  return response.data;
};

const checkAuthentication = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const userData = JSON.stringify({
    token: `${Cookies.get("access")}`,
  });

  const response = await axios.post(VERIFY_URL, userData, config);

  if (response.data) {
    return getUser();
  }
};

const authService = { register, login, logout, checkAuthentication, getUser };

export default authService;
