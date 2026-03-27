import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import api from './api';
import type { Task } from './types/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Trabalho');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Falha ao carregar tarefas:', error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const newTask = await api.createTask({
        title,
        category,
        status: 'Pendente'
      });
      setTasks(prev => [...prev, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleConcluir = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const updated = await api.updateTask(id, { ...task, status: 'Concluído' });
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Erro ao concluir tarefa:', error);
      alert('Erro ao atualizar tarefa');
    }
  };

  const handleDeletar = async (id: number) => {
    if (!confirm('Deseja realmente deletar esta tarefa?')) return;
    
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa');
    }
  };

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
            placeholder="O que precisa ser feito?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria:</label>
          <select 
            id="category"
            value={category} 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
          >
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
            <option value="Musculação">Musculação</option>
            <option value="Bateria">Bateria</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-add">
          {loading ? 'Salvando...' : 'Adicionar Tarefa'}
        </button>
      </form>

      <div className="task-list">
        <h2>Minhas Tarefas</h2>
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <div className="task-meta">
                    <span className="badge">{task.category}</span>
                    <span className="status-label">{task.status}</span>
                  </div>
                </div>
                <div className="task-actions">
                  {task.status !== 'Concluído' && (
                    <button className="btn-done" onClick={() => handleConcluir(task.id)}>Concluir</button>
                  )}
                  <button className="btn-delete" onClick={() => handleDeletar(task.id)}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
