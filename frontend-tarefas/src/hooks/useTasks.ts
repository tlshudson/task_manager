import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types/task';
import { taskService } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data || []);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tarefas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title: string, category?: string) => {
    try {
      const response = await taskService.createTask(title, category);
      const newTask: Task = {
        id: response.id,
        title,
        status: 'pendente',
        category: category || '',
        created_at: new Date().toISOString()
      };
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa.');
      throw err;
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'concluido' ? 'pendente' : 'concluido';
    const updatedTask: Task = { ...task, status: newStatus };
    try {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
      await taskService.updateTask(task.id, updatedTask);
    } catch (err: any) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      setError(err.message || 'Erro ao atualizar tarefa.');
      throw err;
    }
  };

  const removeTask = async (id: number) => {
    try {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await taskService.deleteTask(id);
    } catch (err: any) {
      fetchTasks();
      setError(err.message || 'Erro ao deletar tarefa.');
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTaskStatus,
    removeTask,
    refreshTasks: fetchTasks,
  };
}
