import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { ThemeButton } from "./ThemeButton";
import { Toaster, toast } from "sonner";

export function TaskForm() {
  const {
    createTask,
    inputTitleRef,
    inputDescriptionRef,
    title,
    setTitle,
    description,
    setDescription,
    commonStylesButton,
  } = useContext(TaskContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      toast.error("Rellene título para poder guardar");
      inputTitleRef.current.focus();
    } else if (!description) {
      toast.error("Rellene descripción para poder guardar");
      inputDescriptionRef.current.focus();
    } else {
      createTask({
        title,
        description,
      });
      setTitle("");
      setDescription("");
      inputTitleRef.current.focus();
    }
  }

  const [chuck,setChuck]=useState("");

    useEffect(() => {
      const url = "https://api.chucknorris.io/jokes/random#";
      fetch(url)
        .then(response => response.json())
        .then(data => {
          fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
              q: data.value,
              source: "en",
              target: "es",
              format: "text"
            }),
            headers: { "Content-Type": "application/json" }
          })
          .then(response => response.json())
          .then(data => {
            setChuck(data.translatedText);
          })
          .catch(console.log);
        })
        .catch(console.log);
    }, []);
    


  return (
    <div
      className="dark:bg-slate-800 bg-slate-400 
                      max-w-md mx-auto pt-10 pb-5 px-5 mb-4 min-w-fit"
    >
      <ThemeButton
        className={`${commonStylesButton} 
                            dark:bg-indigo-500 dark:hover:bg-indigo-400
                            bg-indigo-300 hover:bg-indigo-200
                              px-3 py-1 m-2
                              absolute top-2 right-2`}
      />
      <form onSubmit={handleSubmit} className="m-2">
        <h1 className="text-2xl font-bold dark:text-white text-black mb-3">
          Crea tarea
        </h1>
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
        <div className="w-full flex justify-between">
          <button
            className={`${commonStylesButton}
                              dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-white 
                              bg-indigo-300 hover:bg-indigo-200 text-black 
                              mx-2 px-3 py-1 w-fit h-fit`}
          >
            Guardar
          </button>
          <span className="text-white flex-grow text-right wrap-words" style={{overflowWrap: "anywhere"}}>
            {chuck}
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
