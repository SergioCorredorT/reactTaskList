import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

function App() {
  return (
    <main className="dark:bg-zinc-900 bg-zinc-300
                      min-h-screen">
      <div className="container mx-auto p-10">
        <TaskForm />
        <TaskList />
      </div>
    </main>
  );
}

export default App;
