import React from 'react';
import './Home.css';
import { useEffect, useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
const API_URL  = process.env.REACT_APP_API_URL;

export default function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		fetchData().then((json) => {
			setData(json);
			setLoading(false);
		}).catch((error) => {
			alert(error.message);
		});
	},[])

	if (loading) return <p>Carregando...</p>;
	return (
		<div className='container'>
			<header>
				<h1>Home</h1>
			</header>
			<ul className='list-group'>
				{data.map(item => 
				<li key={item.id}>{item.title} | {item.description} | {item.done ? 'Concluído' : 'Pendente'}</li>)}
			</ul>

		</div>
	);
}
