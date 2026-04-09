import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { taskService } from "../../services/api";

function TaskForm() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const LoadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    LoadTasks();
  }, []);
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mb-8">
        Gerenciador de Tarefas
      </h1>
      {isLoading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      )}
    </main>
  );
}
export default TaskForm;
