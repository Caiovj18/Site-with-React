import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";

console.log("Login component loaded");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);

    // Exemplo simples de validação
    if (username && password) {
      navigate("/Menu");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>

        <div>
          <button type="submit" disabled={!isFormValid}>
            Entrar
          </button>
        </div>

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Registrar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
