import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import PropTypes from 'prop-types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Toaster, toast } from "sonner";

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

  const { deleteTask, copyTask, editTask, inputTitleRef, inputDescriptionRef, commonStylesButton, title, description} = useContext(TaskContext);

  function handleClickEdit() {
    if(!title)
    {
      toast.error("Rellene título para poder guardar")
      inputTitleRef.current.focus()
    }
    else if(!description)
    {
      toast.error("Rellene descripción para poder guardar")
      inputDescriptionRef.current.focus();
    }
    else
    {
      editTask(task.id);
      inputTitleRef.current.focus()
    }
  }

  return (
    <div 
      style={style}
      ref={setNodeRef}
      {...attributes}
      className="dark:bg-gray-800 dark:text-white
                   bg-gray-400 text-black
                   p-4"
    >
      <div {...listeners} className="hover:cursor-move" >
        <h1 className="text-xl font-bold capitalize">{task.title}</h1>
        <p className="dark:text-gray-500 
                      text-gray-300
                      text-sm">{task.description}</p>
      </div>
      <div className="grid gap-3 mt-4">
        <button
          className= {`${commonStylesButton} 
                    dark:bg-red-500  dark:hover:bg-red-400 
                    bg-red-300  hover:bg-red-200 
                      px-2 py-1`}
          onClick={() => {deleteTask(task.id); inputTitleRef.current.focus()} }
        >
          Eliminar
        </button>
        <button
          className={`${commonStylesButton}  
                    dark:bg-yellow-500  dark:hover:bg-yellow-400
                    bg-yellow-300  hover:bg-yellow-200
                      px-2 py-1`}
          onClick={handleClickEdit}
        >
          Editar
        </button>
        <button
          className={`${commonStylesButton}  
                    dark:bg-blue-500  dark:hover:bg-blue-400
                    bg-blue-300  hover:bg-blue-200
                      px-2 py-1 rounded-md`}
          onClick={() => {copyTask(task); inputTitleRef.current.focus()} }
        >
          Copiar
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

export default TaskCard;
