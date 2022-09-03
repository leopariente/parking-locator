import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../context/auth-context";

const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="nav-bar">
      <Link to="/" style={{ color: "white" }}>
        Map
      </Link>
      {!auth.isLoggedIn && (
        <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
          Login
        </Link>
      )}
      {auth.isLoggedIn && (
        <>
          <Link
            to="/preferences"
            style={{ color: "white", marginRight: "10px" }}
          >
            Preferences
          </Link>
          <Link to="/" style={{ color: "white" }} onClick={() => auth.logout()}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
