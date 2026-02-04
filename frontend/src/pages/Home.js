import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Home.css';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
const API_URL  = process.env.REACT_APP_API_URL;

export default function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	function sairDaConta() {
		localStorage.removeItem("token");
		window.location.href = "/";
	}

	async function handleCreateTask(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const res = await fetch(`${API_URL}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},

		});

	}


	async function fetchData() {
		const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        return response.json();
	}

	// Carrega os dados quando o componente é montado
	useEffect(() => {
		fetchData().then((json) => {
			setData(json);
			setLoading(false);
		}).catch((error) => {
			alert(error.message);
		});
	},[])

	if (loading) return <div className="spinner-border" role="status">
  <span className="sr-only"></span>
</div>;
	return (

		
		<div className='container'>
			<header>
				<h1>Home</h1>
			</header>
			<main>

			<table className='list-group'>
				<thead>
					<tr>
						<th>Título</th>
						<th>Descrição</th>
						<th id='btn-adicionar-tarefa'><i title='Adicionar Tarefa' onClick={handleShow} className="bi bi-plus-square-fill botao-mais" ></i></th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => 
						<tr key={item.id}>
							<td>{item.title}</td>
							<td>{item.description}</td>
							<td className='td-status'>
								<i className="bi bi-check" style={{color:"green"}}></i>
								<i className="bi bi-x" style={{color:"red"}}></i>

							</td>
						</tr>)}
				</tbody>

			</table>

			</main>
			<footer>
				<i className="bi bi-house-fill" onClick={sairDaConta}></i>
			</footer>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={handleCreateTask}>

					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}
