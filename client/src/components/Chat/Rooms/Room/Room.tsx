import React from "react";
import { change } from "../../../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { Iroom } from "../Rooms";
import { Link } from "react-router-dom";
import s from "./../rooms.module.scss";
import { formatTime } from "../../../../utils/date";
const Room = (props: { item: Iroom }) => {
  const roomId = useSelector((state: any) => state.rooms.id);
  const { item } = props;
  const dispatch = useDispatch();
  const pickRoom = () => {
    dispatch(change(item.ID));
  };
  return (
    <Link
      className={roomId === item.ID ? s.room__link_active : s.room__link}
      to={`${item.ID}`}
      onClick={pickRoom}
    >
      <div className={s.room}>
        <div className={s.room__content}>
          <div>{item.name}</div>
          <p>{item.msgText}</p>
        </div>
        <div className={s.room__date}>
          {item.msgTime ? formatTime(item.msgTime) : ""}
        </div>
      </div>
    </Link>
  );
};

export default Room;
