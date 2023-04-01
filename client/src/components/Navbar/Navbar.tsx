import React from "react";
import s from "./Navbar.module.scss";
import mainLogo from "./../../assets/logo.png";

const Navbar = () => {
  return (
    <div className={s.logo}>
      <img className={s.logo} src={mainLogo} alt="logo" />
    </div>
  );
};

export default Navbar;
