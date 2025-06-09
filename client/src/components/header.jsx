import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../assets/react.svg";
function Header() {
  return (
    <header>
      <Link to={"/"} className="logo">
        <img src={Logo} alt="react Logo" /> React Js
      </Link>

      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/books"}>Books</NavLink>
        <NavLink to={"/about"}>About</NavLink>
      </nav>
    </header>
  );
}

export default Header;
