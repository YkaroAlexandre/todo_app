import React from 'react';
import './Home.css';
import ModalComponent from '../components/Modal';
import { useEffect, useState } from 'react';
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
		const form = new FormData(e.target);
		const title = form.get("title");
		const description = form.get("description");
		const res = await fetch(`${API_URL}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({ title, description })

		});

		if (!res.ok) {
			const errorData = await res.json();
			alert(errorData.message || "Erro ao criar tarefa");
			return;
		}

		const createdTask = await res.json();
		setData(prevData => [...prevData, createdTask]);
		handleClose();

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
			window.location.href = "/";

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
			<ModalComponent show={show} onHide={handleClose} onSubmit={handleCreateTask} />
			
		</div>
	);
}
