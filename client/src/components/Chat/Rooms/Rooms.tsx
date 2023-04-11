import axios from "axios";
import React, { useEffect, useState } from "react";
import s from "./rooms.module.scss";
import Room from "./Room/Room";

export type Iroom = {
  ID: number;
  name: string;
  msgTime: number;
  msgText: string;
};
const Rooms = () => {
  const [rooms, setRooms] = useState<Array<Iroom>>([]);
  const getRooms = async () => {
    await axios.get("http://localhost:6060/rooms/getRooms").then((res) => {
      setRooms(res.data.data);
    });
  };
  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className={s.rooms}>
      <div className={s.title}>
        <p>Комнаты</p>
        <div className={s.rooms__count}>{rooms.length}</div>
      </div>

      {rooms.length > 0 &&
        rooms.map((room: Iroom) => (
          <div key={room.ID}>
            <Room item={room} />
          </div>
        ))}
    </div>
  );
};

export default Rooms;
