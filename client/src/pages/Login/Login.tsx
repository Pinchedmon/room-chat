import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./login.module.scss";
const Login = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.setItem("username", value);
    navigate("../");
  };
  return (
    <div className={s.login}>
      <form className={s.form__group + s.field} onSubmit={handleSubmit}>
        <label className={s.form__label}>
          Введите имя ваше пожалуйста
          <input
            type="input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={s.form__field}
            placeholder="Name"
            id="name"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default Login;
