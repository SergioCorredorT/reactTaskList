import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

function TaskList() {

  const {tasks,setTasks}=useContext(TaskContext);

  if (tasks.length === 0) {
    return <h1 className="text-white text-4xl font-bold text-center">Sin tareas</h1>;
  }

  const handleDragEnd= (e) =>{
    const {active, over} = e;

    setTasks((tasks)=> {
      const oldIndex = tasks.findIndex(task => task.id==active.id);
      const newIndex = tasks.findIndex(task=>task.id==over.id);

      return arrayMove(tasks, oldIndex, newIndex);
    })
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <DndContext 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks}
          strategy={horizontalListSortingStrategy}
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
