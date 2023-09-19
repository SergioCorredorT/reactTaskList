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
  }= useSortable({
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
      className="bg-gray-800 text-white p-4 rounded-md"
    >
      <div {...listeners} className="" >
        <h1 className="text-xl font-bold capitalize">{task.title}</h1>
        <p className="text-gray-500 text-sm">{task.description}</p>
      </div>
      <div className="grid gap-3 mt-4">
        <button
          className="bg-red-500 px-2 py-1 rounded-md hover:bg-red-400"
          onClick={() => {deleteTask(task.id); inputRef.current.focus()} }
        >
          Eliminar
        </button>
        <button
          className="bg-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-400"
          onClick={() => {editTask(task.id);inputRef.current.focus()} }
        >
          Editar
        </button>
        <button
          className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-400"
          onClick={() => {copyTask(task); inputRef.current.focus()} }
        >
          Copiar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
