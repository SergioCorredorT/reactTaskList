import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { ThemeButton } from "./ThemeButton";
import { toast } from "sonner";

export function TaskForm() {

  const { createTask, inputTitleRef, inputDescriptionRef, title, setTitle, description, setDescription, commonStylesButton } = useContext(TaskContext);

  function handleSubmit(e) {
    e.preventDefault();
    if(!title)
    {
      toast.error("Rellene título para poder guardar")
      inputTitleRef.current.focus()
    }
    else if(!description)
    {
      toast.error("Rellene descripción para poder guardar")
      inputDescriptionRef.current.focus()
    }
    else
    {
      createTask({
        title,
        description,
      });
      setTitle("");
      setDescription("");
      inputTitleRef.current.focus();
    }
  }

  return (
    <div className="dark:bg-slate-800 bg-slate-400 
                      max-w-md mx-auto p-10 mb-4">
      <ThemeButton className={`${commonStylesButton} 
                            dark:bg-indigo-500 dark:hover:bg-indigo-400
                            bg-indigo-300 hover:bg-indigo-200
                              px-3 py-1 m-2
                              absolute top-2 right-2`} />
      <form onSubmit={handleSubmit} className="m-2">
        <h1 className="text-2xl font-bold dark:text-white text-black mb-3">Crea tarea</h1>
        <input
          className="dark:bg-slate-600  dark:hover:bg-slate-500 dark:text-white
                    bg-slate-300  hover:bg-slate-200 text-black
                      p-3 w-full mb-2"
          placeholder="Escribe un título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={inputTitleRef} 
          autoFocus
          //required
        />
        <textarea
          className="dark:bg-slate-600  dark:hover:bg-slate-500 dark:text-white
          bg-slate-300  hover:bg-slate-200 text-black
            p-3 w-full mb-2"
          placeholder="Escribe descripción"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          ref={inputDescriptionRef}
          //required
        ></textarea>
        <button className={`${commonStylesButton}
                            dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-white 
                            bg-indigo-300 hover:bg-indigo-200 text-black 
                            mx-2 px-3 py-1`}>Guardar</button>
      </form>
    </div>
  );
}
