import React, { useEffect, useState } from "react";
import Rooms from "./Rooms/Rooms";
import s from "./chat.module.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

interface Imessage {
  id: number;
  username: string;
  text: string;
}
function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState<Array<Imessage>>([]);
  const checkMessages = async () => {
    await axios
      .get(
        `http://localhost:6060/message/getMessages?id="${location.pathname.match(
          "[0-9]"
        )}"`
      )
      .then((res) => {
        setMessages(res.data.data);
      });
  };
  // const { refetch } = useQuery("messages", () => );

  useEffect(() => {
    checkMessages();
  }, [location.pathname]);
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
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
