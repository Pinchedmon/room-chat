import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SERVER_URL = "http://localhost:6060";
interface Imessage {
  id?: number;
  username: string;
  text: string;
}
export const useChat = () => {
  const roomId = useSelector((state: any) => state.rooms.id);
  const navigate = useNavigate();
  const location = useLocation();
  const socketRef = useRef<any>(null);
  const [typingUsers, setTypingUsers] = useState<Array<string>>([]);
  const [messages, setMessages] = useState<Array<Imessage>>([]);
  const username = localStorage.getItem("username");
  if (!username) {
    navigate("/login");
  }

  useEffect(() => {
    setMessages([]);
    checkMessages();
  }, [location.pathname]);
  useEffect(() => {
    socketRef.current = io(SERVER_URL) as any;
    socketRef.current.on("user joined", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "присоединение", text: data.username },
        { username: "количество участников", text: data.numUsers },
      ]);
    });
    socketRef.current.on("connected to room", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "статус", text: data.message },
      ]);
    });
    socketRef.current.on("new message", (data: any) => {
      setMessages((prev) => [...prev, data.message]);
    });
    socketRef.current.on("login", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "количество", text: data.numUsers },
      ]);
    });
    socketRef.current.on("typing", (data: any) => {
      setTypingUsers((prev) => [...prev, data.username]);
    });
    socketRef.current.on("stop typing", (data: any) => {
      setTypingUsers(
        typingUsers.filter((names: any) => names !== data.username)
      );
    });
    socketRef.current.on("user left", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "отключение", text: data.username },
      ]);
    });
  }, []);
  const sendMessage = (value: string) => {
    socketRef.current.emit("new message", {
      username: username,
      text: value,
      roomId: roomId,
    });
  };
  const leaveRoom = (roomId: number) => {
    socketRef.current.emit("leave room", roomId);
  };
  const checkMessages = async () => {
    await axios
      .get(`http://localhost:6060/message/getMessages?id="${roomId}"`)
      .then((res) => {
        setMessages(res.data.data);
      });
    socketRef.current.emit("connect to room", { roomId, username });
  };
  const typingTrue = () => {
    socketRef.current.emit("typing");
  };
  const typingFalse = () => {
    socketRef.current.emit("stop typing");
  };
  return {
    messages,
    sendMessage,
    checkMessages,
    leaveRoom,
    typingTrue,
    typingFalse,
    typingUsers,
  };
};
