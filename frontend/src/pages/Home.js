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

	const token = localStorage.getItem("token");
	
	// Função para marcar/desmarcar tarefa como concluída
	const handleCheck = async (taskId) => {
		const task = data.find(t => t.id === taskId);
		try {
			const res = await fetch(`${API_URL}/tasks/${taskId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({ 
					title: task.title, 
					description: task.description,
					done: !task.done
				})
			});

			if (!res.ok) {
				alert("Erro ao atualizar tarefa");
				return;
			}

			// Atualiza o estado local com a resposta do servidor
			const updatedTask = await res.json();
			setData(prevData => 
				prevData.map(t => t.id === taskId ? updatedTask : t)
			);
		} catch (error) {
			alert("Erro ao atualizar tarefa: " + error.message);
		}
	}


	function sairDaConta() {
		localStorage.removeItem("token");
		window.location.href = "/";
	}

	async function handleCreateTask(e) {
		e.preventDefault();
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
						<tr id={`task-${item.id}`} key={item.id}>
							<td className={item.done ? 'tarefa-concluida' : ''}>{item.title}</td>
							<td className={item.done ? 'tarefa-concluida' : ''}>{item.description}</td>
							<td className='td-status'>
								<i className="bi bi-check" onClick={() => handleCheck(item.id)} style={{color:"green"}}></i>
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
