import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

//Aquí se crea
export const TaskContext = createContext();

//Con esto se otorga para usarlo
export function TaskContextProvider(props) {
  // Inicializa el estado de las tareas con cualquier tarea guardada en localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const inputTitleRef = useRef();
  const inputDescriptionRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function copyTask(task) {
    setTitle(task.title);
    setDescription(task.description);
  }

  function editTask(taskId) {
      //setTasks envía como parámetro siempre el task actual, que en este caso se recoge como prevTasks
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title, description } : task
        )
      );
  }

  useEffect(() => {
    // Guarda las tareas en el localStorage cada vez que cambien
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const commonStylesButton=`dark:text-white dark:active:shadow-t-white dark:shadow-b-white
                            text-black active:shadow-t-black shadow-b-black
                            transform translate-y-[-1px] active:translate-y-1 rounded-md`

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        inputTitleRef,
        inputDescriptionRef,
        title,
        setTitle,
        description,
        setDescription,
        deleteTask,
        createTask,
        copyTask,
        editTask,
        commonStylesButton,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

TaskContextProvider.propTypes = {
  children: PropTypes.node,
};
