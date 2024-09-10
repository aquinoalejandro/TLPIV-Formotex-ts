import React from "react";

export const Login = () => {
    return (
        <div>
            <h1>login</h1>
                <form action="" method="post">
                    <label htmlFor="nombre">Nombre y apellido</label>
                    <input type="text" id="nombre"/>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                    <input type="submit" value="login"/>
            </form>
        </div>
    );
};