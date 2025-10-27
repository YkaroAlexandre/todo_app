import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

    async function handleRegister(e){
        e.preventDefault();

        const res = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        let data;
        try {
            data = await res.json();
        } catch (error) {
            data = { message: "Erro ao processar resposta do servidor." };
        }

        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    }

     return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    required
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                <button type="submit">Criar</button>
                <p>Já tem uma conta? </p>
                <button type="button" onClick={() => window.location.href = "/"}>Entrar</button>
            </form>
        </div>
    )
}
