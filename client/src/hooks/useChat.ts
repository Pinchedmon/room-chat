import { useEffect, useRef, useState } from "react";
// получаем класс IO
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// наши хуки

const SERVER_URL = "http://localhost:6060";
interface Imessage {
  id?: number;
  username: string;
  text: string;
}

// хук принимает название комнаты
export const useChat = () => {
  const roomId = useSelector((state: any) => state.rooms.id);
  const navigate = useNavigate();
  const location = useLocation();
  const socketRef = useRef<any>(null);
  const [messages, setMessages] = useState<Array<Imessage>>([]);
  const username = localStorage.getItem("username");
  if (!username) {
    navigate("/login");
  }

  useEffect(() => {
    setMessages([]);
    console.log(roomId);
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
      setMessages((prev) => [...prev, data.message]);
    });
    socketRef.current.on("stop typing", (data: any) => {
      setMessages((prev) => [...prev, data.message]);
    });
    socketRef.current.on("user left", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "отключение", text: data.username },
      ]);
    });
  }, []);

  const sendMessage = async (value: string) => {
    socketRef.current.emit("new message", {
      username: "pinch",
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

  return { messages, sendMessage, checkMessages, leaveRoom };
};
