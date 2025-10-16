import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Login.css";  
import { login } from "../../services/api";
import { UserLogin } from "../../types/userTypes";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page reload when submitting

    if (!identifier || !password) {
      alert("Please fill in all fields");
      return;
    }

    const userLogin: UserLogin = { identifier, password };

    login(userLogin).then((response) => {
      if (response.ok) {
        navigate("/");
        sessionStorage.setItem("user", JSON.stringify(response.data));
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <div className="login">
      <Header pageTitle="Login" />

      <div className="login__container">
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="Identifier">Username or Email:</label>
          <input
            type="text"
            id="Identifier"
            name="Identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="Password"
            name="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;