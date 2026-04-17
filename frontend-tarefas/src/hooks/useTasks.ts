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
      // Assume the backend returns an array of tasks. If it's wrapped in an object, we need to adjust this.
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

  const addTask = async (title: string, description?: string) => {
    try {
      const newTask = await taskService.createTask(title, description);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa.');
      throw err;
    }
  };

  const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
    try {
      // Optimistic Update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed: !currentStatus } : t))
      );
      await taskService.updateTask(id, { is_completed: !currentStatus });
    } catch (err: any) {
      // Revert optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed: currentStatus } : t))
      );
      setError(err.message || 'Erro ao atualizar tarefa.');
      throw err;
    }
  };

  const removeTask = async (id: number) => {
    try {
      // Optimistic Delete
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await taskService.deleteTask(id);
    } catch (err: any) {
      // To properly revert, we'd need to store the deleted task, but for now we re-fetch to ensure sync
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
