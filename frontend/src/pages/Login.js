import { useState } from "react";
import "../index.css";
import { Form, Button } from "react-bootstrap";

function Login() {
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
        <div className="container">
            <h1>Login</h1>
            {/* <Form onSubmit={handleLogin}>
                <Form.Label>E-mail</Form.Label>
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
            </Form> */}
            <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" />
        
      </Form.Group>
        <Button type="submit">Entrar</Button>
    </Form>
        </div>
    )
}

export default Login;