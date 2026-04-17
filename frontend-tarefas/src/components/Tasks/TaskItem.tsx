import type { Task } from '../../types/task';
import { Checkbox } from '../UI/Checkbox';
import { Button } from '../UI/Button';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'concluido';

  return (
    <li className={`
      flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-300
      ${isCompleted 
        ? 'bg-gray-50/50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-800' 
        : 'bg-white border-gray-100 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700'
      }
    `}>
      <div className="flex items-center space-x-4 flex-1">
        <Checkbox 
          checked={isCompleted}
          onChange={() => onToggle(task)}
        />
        <div className="flex flex-col">
          <span className={`text-base font-medium transition-all duration-300 ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
            {task.title}
          </span>
          {task.category && (
            <span className={`text-sm mt-0.5 ${isCompleted ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Categoria: {task.category}
            </span>
          )}
        </div>
      </div>
      
      <Button 
        variant="danger" 
        onClick={() => onDelete(task.id)}
        className="!p-2 ml-4 rounded-lg opacity-0 md:opacity-100 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label="Deletar tarefa"
        title="Deletar tarefa"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </Button>
    </li>
  );
}
