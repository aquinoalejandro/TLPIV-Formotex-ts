import React, { useState } from "react";
import '../css/auth.css'

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        window.location.href = "/MainPage";
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error de autenticación");
    }
  };

  return (
    <div className="form">
      <div >
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={ {height: '20vh'}}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" value="Login" />
          {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          
        </form>
      </div>
      
    </div>
  );
};