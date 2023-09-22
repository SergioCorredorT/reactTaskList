import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import PropTypes from 'prop-types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task }) {

  TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
      id: task.id
    })

  const style={
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1, // Aumenta el z-index cuando se está arrastrando
  }

  const { deleteTask, copyTask, editTask, inputRef} = useContext(TaskContext);

  return (
    <div 
      style={style}
      ref={setNodeRef}
      {...attributes}
      className="dark:bg-gray-800 dark:text-white
                   bg-gray-400 text-black
                   p-4 rounded-md"
    >
      <div {...listeners} className="hover:cursor-move" >
        <h1 className="text-xl font-bold capitalize">{task.title}</h1>
        <p className="dark:text-gray-500 
                      text-gray-300
                      text-sm">{task.description}</p>
      </div>
      <div className="grid gap-3 mt-4">
        <button
          className=" dark:bg-red-500  dark:hover:bg-red-400 
                    bg-red-300  hover:bg-red-200 
                      px-2 py-1 rounded-md"
          onClick={() => {deleteTask(task.id); inputRef.current.focus()} }
        >
          Eliminar
        </button>
        <button
          className="dark:bg-yellow-500  dark:hover:bg-yellow-400
                    bg-yellow-300  hover:bg-yellow-200
                      px-2 py-1 rounded-md"
          onClick={() => {editTask(task.id);inputRef.current.focus()} }
        >
          Editar
        </button>
        <button
          className="dark:bg-blue-500  dark:hover:bg-blue-400
                    bg-blue-300  hover:bg-blue-200
                      px-2 py-1 rounded-md"
          onClick={() => {copyTask(task); inputRef.current.focus()} }
        >
          Copiar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
