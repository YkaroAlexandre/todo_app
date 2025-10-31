import { useState } from "react";
import "../index.css";
import "./Register.css";
import { Form, Button } from "react-bootstrap";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

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
            window.location.href = "/login/";
        } else {
            alert(data.message);
        }
    }

     return (
        <div className="container">
            <header>
                <h1>Register</h1>
            </header>
            <main>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control required type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                </Form.Group>
                <Button className="botao" type="submit">Criar</Button>
            </Form>
            </main>

            <footer>
                <div className="container-register">
                    <p id="sem-conta">Já tem uma conta? </p>
                    <Button className="botao" href="/">Entrar</Button>
                </div>
            </footer>
        </div>
    )
}