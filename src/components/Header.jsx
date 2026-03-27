import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/project">Project</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Header;
