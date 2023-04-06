import React from "react";
import s from "./../chat.module.scss";
function Message(props: { data: any }) {
  const username = localStorage.getItem("username");
  const { data } = props;
  return (
    <div className={data.username == username ? s.message__your : s.message}>
      <p>
        {data.username}: {data.text}
      </p>
    </div>
  );
}

export default Message;
