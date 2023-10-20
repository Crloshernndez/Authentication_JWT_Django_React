import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/pages/Home";
import Dashboard from "./containers/pages/Dashboard";
import Register from "./containers/pages/Register";
import Login from "./containers/pages/Login";
import Error404 from "./containers/error/Error404";
import Layout from "./hocs/Layout";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Error Display */}

            <Route path="*" element={<Error404 />} />

            {/* Home Display */}
            <Route path="/" element={<Home />} />

            {/* Dashboar Display */}
            <Route path="dashboard/" element={<Dashboard />} />

            {/* Register Display */}
            <Route exact path="/register" element={<Register />} />

            {/* Login Display */}
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}
export default App;
