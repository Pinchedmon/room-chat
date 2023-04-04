import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.setItem("username", value);
    navigate("../");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Введите имя ваше пожалуйста</p>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Login;
