import MainLayout from "./components/Layout/MainLayout";
import { TaskForm } from "./components/Tasks/TaskForm";
import { TaskList } from "./components/Tasks/TaskList";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { tasks, loading, error, addTask, toggleTaskStatus, removeTask } = useTasks();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Minhas Tarefas
          </h1>
          <p className="text-gray-500 mt-2">
            Organize seu dia com facilidade.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <p className="font-medium">Ops, algo deu errado:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <TaskForm onAdd={addTask} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Tarefas Atuais ({tasks.length})
            </h2>
          </div>

          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={toggleTaskStatus}
            onDelete={removeTask}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
