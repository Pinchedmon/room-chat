import axios from "axios";
import React, { useEffect, useState } from "react";
import s from "./rooms.module.scss";
import Room from "./Room/Room";

export type Iroom = {
  ID: number;
  name: string;
};
const Rooms = (props: { refetch: () => void }) => {
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
      {rooms.length > 0 &&
        rooms.map((room: Iroom) => (
          <div key={room.ID}>
            <Room refetch={props.refetch} item={room} />
          </div>
        ))}
    </div>
  );
};

export default Rooms;
