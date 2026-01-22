const API_URL  = process.env.REACT_APP_API_URL;

export const taskService = {
    async getTasks() {
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
    },

    async createTask(taskData) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if(!response.ok) {
            throw new Error('Erro ao criar tarefa');
        }
        return response.json();
    },
}