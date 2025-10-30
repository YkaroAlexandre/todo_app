import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

function Home() {
	return (
		<>
			<Navbar bg="light" expand="lg" className="mb-4">
				<Container>
					<Navbar.Brand href="#">To Do App</Navbar.Brand>
					<Button variant="primary">Nova tarefa</Button>
				</Container>
			</Navbar>

			<Container>
				<h1>Minhas Tarefas</h1>
				<p>Use o botão "Nova tarefa" para adicionar uma nova tarefa.</p>
			</Container>
		</>
	);
}

export default Home;