import React, { useEffect, useState } from "react";
import Rooms from "./Rooms/Rooms";
import s from "./chat.module.scss";

import { useChat } from "../../hooks/useChat";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
interface Imessage {
  id?: number;
  username: string;
  text: string;
}
function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/1");
  }, []);

  const dispatch = useDispatch();
  // dispatch()
  const location = useLocation();
  // const id = location.pathname.match("[0-9]") as any;
  // console.log(id[0]);
  const { messages, sendMessage } = useChat();
  const [value, setValue] = useState("");

  return (
    <div className={s.chat}>
      <Rooms refetch={() => 1} />
      <div>
        {messages.length > 0 &&
          messages.map((message: Imessage, index) => (
            <div key={index}>
              {message.username}: {message.text}
            </div>
          ))}
        <div>
          <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></textarea>
          <button onClick={() => sendMessage(value)}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
