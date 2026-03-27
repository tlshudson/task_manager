import type { Task } from './types/Task';

const API_URL = 'https://task_manager.test';

const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return await response.json();
  },
  createTask: async (task: Omit<Task, 'id' | 'created_at'>): Promise<Task> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return await response.json();
  },
  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return await response.json();
  },
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
  }
};

export default api;