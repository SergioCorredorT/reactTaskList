import { createContext, useEffect, useRef, useState } from "react";
import { tasks as data } from "../data/tasks";

//Aquí se crea
export const TaskContext = createContext();

//Con esto se otorga para usarlo
export function TaskContextProvider(props) {
  //el useState debe recibir un array vacío?
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        id: tasks.length+1,
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

  function editTask(taskId)
  {
    if (title && description) {
      //setTasks envía como parámetro siempre el task actual, que en este caso se recoge como prevTasks
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title, description } : task
        )
      );
    }
  }

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        inputRef,
        title,
        setTitle,
        description,
        setDescription,
        deleteTask,
        createTask,
        copyTask,
        editTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
