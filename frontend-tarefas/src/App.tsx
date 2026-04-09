import MainLayout from "./components/Layout/MainLayout";
import TaskForm from "./components/Tasks/TaskForm";

function App() {
  return (
    <>
      <MainLayout children={<TaskForm />} />
    </>
  );
}
export default App;
