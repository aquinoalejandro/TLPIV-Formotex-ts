import React, { useState } from "react";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/MainPage";
        } else {
            setError("Credenciales incorrectas");
        }
        } catch (error) {
        setError("Error de autenticación");
        }
    };

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <input type="submit" value="Register" />
            <a href="/login">Ya tengo una cuenta</a>
            {error && <p style={{ color: "red" }}>{error}</p>}

        </form>
        </div>
    );
};