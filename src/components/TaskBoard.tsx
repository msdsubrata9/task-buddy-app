import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateTask } from "../services/tasks"; // Firebase service
import { Task } from "../utils/types";

interface TaskBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  setTasks,
  onEdit,
  onDelete,
}) => {
  const statuses = ["todo", "in-progress", "complete"];

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  // Handle Drag & Drop
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const newStatus = destination.droppableId;

    // Find the dragged task
    const taskToUpdate = tasks.find((task) => task.id === draggableId);
    if (!taskToUpdate) return;

    // Update Firestore
    await updateTask({ ...taskToUpdate, status: newStatus });

    // Update local state to reflect changes immediately
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggableId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 bg-gray-100 rounded-md shadow-md min-h-[400px] ${
                  snapshot.isDraggingOver ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <h2 className="text-lg font-semibold text-gray-700 capitalize mb-3">
                  {status.replace("-", " ")}
                </h2>
                {getTasksByStatus(status).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 bg-white rounded-md shadow-md mb-3 ${
                          snapshot.isDragging ? "bg-blue-100" : "bg-white"
                        }`}
                      >
                        <h3 className="text-md font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-500">
                          Due: {task.dueDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Category: {task.category}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => onEdit(task)}
                            className="px-2 py-1 bg-blue-500 text-white rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(task.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
