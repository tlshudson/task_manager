import { apiFetch } from './api';
import type { Task } from '../types/task';

export const taskService = {
  getTasks: (): Promise<Task[]> => {
    return apiFetch<Task[]>('/tasks', { method: 'GET' });
  },

  createTask: (title: string, category?: string): Promise<{ id: number; message: string }> => {
    return apiFetch<{ id: number; message: string }>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, category }),
    });
  },

  updateTask: (id: number, task: Task): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>(`/tasks/${id}`, {
      method: 'PUT',
      // O PHP exige title, status e category na atualização
      body: JSON.stringify({ 
        title: task.title, 
        status: task.status, 
        category: task.category || '' 
      }),
    });
  },

  deleteTask: (id: number): Promise<void> => {
    return apiFetch<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
