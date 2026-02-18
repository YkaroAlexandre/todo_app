import { useState } from "react";
import "../index.css";
import "./Login.css";
import { Form, Button } from "react-bootstrap";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isExiting, setIsExiting] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    async function handleLogin(e){
        e.preventDefault();
        setIsExiting(false);
        setError("");

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
            window.location.href = "/home/";
        } else {
            setError(data?.message || "Email ou senha inválidos");
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => setError(""), 500);
            }, 3000);
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Login</h1>
            </header>
            <main>
            
            {error && <div className={`alert alert-danger ${isExiting ? 'exit' : ''}`} role="alert">{error}</div>}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                </Form.Group>
                <Button className="botao" type="submit">Entrar</Button>
            </Form>
            </main>

            <footer>
                <div className="container-login">
                    <p id="sem-conta">Não tem uma conta? </p>
                    <Button className="botao"  href="/register">Registrar</Button>

                </div>
            </footer>
        </div>
    )
}