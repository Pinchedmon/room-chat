import React from "react";
import s from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={s.logobox}>
      <div className={s.logo}>
        <p>Chat</p>
      </div>
    </div>
  );
};

export default Navbar;
