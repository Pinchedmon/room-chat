import React from "react";
import s from "./directory.module.scss";
function Directory(props: { users: Array<string> }) {
  const { users } = props;
  return (
    <div className={s.directory}>
      <div className={s.directory__title}>
        <p>Директорий</p>
      </div>
      <div className={s.directory__count}>
        <div className={s.directory__count_title}>
          Team Members <div className={s.directory__number}>{users.length}</div>
        </div>
        <div className={s.directory__count_names}>
          {users.map((user: string, index: number) => (
            <div key={index}>{user}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Directory;
