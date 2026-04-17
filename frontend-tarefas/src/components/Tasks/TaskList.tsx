import type { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, loading, onToggle, onDelete }: TaskListProps) {
  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada. Que tal criar uma?</p>
      </div>
    );
  }

  return (
    <ul className="group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
