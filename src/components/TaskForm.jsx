import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function TaskForm() {

  const { createTask, inputRef, title, setTitle, description, setDescription } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({
      title,
      description,
    });
    setTitle("");
    setDescription("");
    inputRef.current.focus(); 
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-3">Crea tarea</h1>
        <input
          className="bg-slate-300 p-3 w-full mb-2 hover:bg-slate-200"
          placeholder="Escribe tu tarea"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={inputRef} 
          autoFocus
          required
        />
        <textarea
          className="bg-slate-300 p-3 w-full mb-2 hover:bg-slate-200"
          placeholder="Escribe descripción"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        ></textarea>
        <button className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 text-white">Guardar</button>
      </form>
    </div>
  );
}
