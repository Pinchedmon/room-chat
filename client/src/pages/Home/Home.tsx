import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Chat from "../../components/Chat/Chat";
import s from "./home.module.scss";

function Home() {
  return (
    <div className={s.home}>
      <Navbar />
      <Chat />
    </div>
  );
}

export default Home;
