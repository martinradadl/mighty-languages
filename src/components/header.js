import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginDialog } from "./authentication/login-dialog";
import "../styles/header.css";
import { AuthContext } from "../context/auth-context";
import { ProfileDialog } from "../pages/profile/profile-dialog";
import { AuthDialog } from "./authentication/auth-dialog";

export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <nav width="100%">
      <div className="left-side-header">
        <Link className="links" to="/">
          Home
        </Link>

        <Link className="links" to="/courses">
          Courses
        </Link>
      </div>
      <div className="right-side-header">
        {isAuthenticated ? (
          <ProfileDialog />
        ) : (
          <AuthDialog />
        )}
      </div>
    </nav>
  );
};
