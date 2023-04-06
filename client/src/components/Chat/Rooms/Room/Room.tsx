import React from "react";
import { change } from "../../../../store/roomsSlice";
import { useDispatch } from "react-redux";
import type { Iroom } from "../Rooms";
import { Link } from "react-router-dom";
const Room = (props: { item: Iroom; refetch: () => void }) => {
  const { item } = props;
  const dispatch = useDispatch();
  const pickRoom = () => {
    dispatch(change(item.ID));
  };
  return (
    <div>
      <Link to={`${item.ID}`} onClick={pickRoom}>
        {item.name}
      </Link>
    </div>
  );
};

export default Room;
