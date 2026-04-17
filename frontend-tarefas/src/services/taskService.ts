import { apiFetch } from './api';
import type { Task } from '../types/task';

export const taskService = {
  getTasks: (): Promise<Task[]> => {
    return apiFetch<Task[]>('/tasks', { method: 'GET' });
  },

  createTask: (title: string, description?: string): Promise<Task> => {
    return apiFetch<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });
  },

  updateTask: (id: number, updates: Partial<Task>): Promise<Task> => {
    return apiFetch<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteTask: (id: number): Promise<void> => {
    return apiFetch<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
