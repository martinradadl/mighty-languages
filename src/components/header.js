import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { ProfileDialog } from "./profile/profile-dialog";
import { AuthDialog } from "./authentication/auth-dialog";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state) => state.users.selectedUser);
  return (
    <nav width="100%">
      <div className="left-side-header">
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/courses">
          Cursos
        </Link>
        {user !== null ? (
          <Link className="links" to="/my-courses">
            Mis Cursos
          </Link>
        ) : null}
      </div>
      <div className="right-side-header">
        {user !== null ? <ProfileDialog user={user} /> : <AuthDialog />}
      </div>
    </nav>
  );
};
