import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

    async function handleLogin(e){
        e.preventDefault();

        const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        let data;
        try {
            data = await res.json();
        } catch (error) {
            data = { message: "Erro ao processar resposta do servidor." };
        }

        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/home";
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    required
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    required
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
                <p>Não tem uma conta? </p>
                <button type="button" onClick={() => window.location.href = "/register"}>Registrar</button>
            </form>
        </div>
    )
}

  