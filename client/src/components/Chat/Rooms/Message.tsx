import React from "react";
import s from "./../chat.module.scss";
import { formatTime } from "../../../utils/date";
function Message(props: { data: any }) {
  const username = localStorage.getItem("username");
  const { data } = props;
  return (
    <>
      {data.username == username ? (
        <div className={s.message__wrapper}>
          <div className={s.message__your}>{data.text}</div>
          <div>{formatTime(data.date)}</div>
        </div>
      ) : (
        <>
          {data.username !== "количество участников" &&
          data.username !== "присоединение" &&
          data.username !== "количество" &&
          data.username !== "статус" ? (
            <div className={s.message__wrapper}>
              <div>{formatTime(data.date)}</div>
              <div className={s.message}>
                <span>{data.username}:</span> {data.text}
              </div>
            </div>
          ) : (
            <div className={s.message__wrapper}>
              <div className={s.message__status}>{formatTime(data.date)}</div>
              <div className={s.message__status}>
                <span>{data.username}:</span> {data.text}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Message;
