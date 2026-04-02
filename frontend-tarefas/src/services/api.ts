import type { Task } from "../types/task";

const BASE_URL = "http://backend-tarefas.test/";

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) throw new Error("Erro ao buscar tarefas");
    return response.json();
  },

  async create(task: Omit<Task, "id" | "created_at">): Promise<Task> {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erro ao criar tarefas!');
    return response.json();
  },

    async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefas!');
  },
};
