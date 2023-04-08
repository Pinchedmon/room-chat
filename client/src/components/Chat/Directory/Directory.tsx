import React from "react";
import s from "./directory.module.scss";
function Directory() {
  return (
    <div className={s.directory}>
      <div className={s.directory__title}>
        <p>Директорий</p>
      </div>
      <div className={s.directory__count}>
        <div className={s.directory__count_title}>
          Team Members <div className={s.directory__number}> 8</div>
        </div>
        <div className={s.directory__count_names}>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
}

export default Directory;
