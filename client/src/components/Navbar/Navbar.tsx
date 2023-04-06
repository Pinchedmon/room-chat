import React from "react";
import s from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={s.logobox}>
      <p className={s.logo}>chat</p>
    </div>
  );
};

export default Navbar;
