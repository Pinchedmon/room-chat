import React from "react";
import { change } from "../../../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { Iroom } from "../Rooms";
import { Link } from "react-router-dom";
import s from "./../rooms.module.scss";
const Room = (props: { item: Iroom; refetch: () => void }) => {
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
          <p>Example message</p>
        </div>
        <div className={s.room__date}>date</div>
      </div>
    </Link>
  );
};

export default Room;
