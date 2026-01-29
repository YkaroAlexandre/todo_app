import React from 'react';
import './Home.css';
import { useEffect, useState } from 'react';
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
			<table className='list-group'>
				<thead>
					<tr>
						<th>Título</th>
						<th>Descrição</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => 
						<tr key={item.id}>
							<td>{item.title}</td>
							<td>{item.description}</td>
							<td>
								<i class="bi bi-check"></i>
								<i class="bi bi-x"></i>

							</td>
						</tr>)}
				</tbody>

			</table>

		</div>
	);
}
