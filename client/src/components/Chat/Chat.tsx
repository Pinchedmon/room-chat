import React, { useEffect, useState } from "react";
import Rooms from "./Rooms/Rooms";
import s from "./chat.module.scss";
import { useChat } from "../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import Message from "./Rooms/Message";
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
  const { messages, sendMessage, typingFalse, typingTrue, typingUsers } =
    useChat();
  const [value, setValue] = useState("");
  return (
    <div className={s.chat}>
      <Rooms refetch={() => 1} />
      <div className={s.chatroom}>
        {messages.length > 0 &&
          messages.map((message: Imessage, index) => (
            <div key={index}>
              <Message data={message} />
            </div>
          ))}
        {typingUsers.length > 0 && (
          <div>
            {typingUsers.length > 1
              ? `${typingUsers.length} печатают`
              : `${typingUsers[0]} печатает`}
          </div>
        )}
        <div>
          <textarea
            value={value}
            onBlur={typingFalse}
            onFocus={typingTrue}
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
