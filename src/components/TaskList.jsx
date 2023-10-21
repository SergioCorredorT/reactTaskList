import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";

function TaskList() {

  const {tasks,setTasks}=useContext(TaskContext);

  if (tasks.length === 0) {
    return <h1 className="dark:text-white
                        text-black
                          text-4xl font-bold text-center">Sin tareas</h1>;
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;
  
    if (over) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id == active.id);
        const newIndex = tasks.findIndex((task) => task.id == over.id);
  
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
    else
    {
      console.log("daría error");
    }
  };
  

  return (
    <div className="grid gap-2 grid-columns-autofill">
      <DndContext 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks}
          strategy={rectSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default TaskList;
