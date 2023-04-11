import React, { useEffect, useState } from "react";
import Rooms from "./Rooms/Rooms";
import s from "./chat.module.scss";
import { useChat } from "../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import Message from "./Rooms/Message";
import Directory from "./Directory/Directory";
import { Textarea } from "@mui/joy";

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
  const { messages, sendMessage, users, typingFalse, typingTrue, typingUsers } =
    useChat();
  const [value, setValue] = useState("");
  return (
    <div className={s.chat}>
      <Rooms />
      <div className={s.chatroom}>
        <div className={s.chatroom__content}>
          {messages.length > 0 &&
            messages.map((message: Imessage, index) => (
              <div key={index}>
                <Message data={message} />
              </div>
            ))}
          {typingUsers.length > 0 && (
            <div className={s.chatroom__typing}>
              {typingUsers.length > 1
                ? `${typingUsers.length} печатают...`
                : `${typingUsers[0]} печатает...`}
            </div>
          )}
        </div>
        <div className={s.chatroom__send}>
          <div className={s.chatroom__send_textarea}>
            <Textarea
              value={value}
              onBlur={typingFalse}
              onFocus={typingTrue}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              color="info"
              size="md"
              placeholder="Type anything…"
            />
          </div>
          <button onClick={() => sendMessage(value)}>Отправить</button>
        </div>
      </div>
      <Directory users={users} />
    </div>
  );
}

export default Chat;
