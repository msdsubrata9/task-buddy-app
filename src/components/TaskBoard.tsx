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
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskToUpdate = tasks.find((task) => task.id === draggableId);
    if (!taskToUpdate) {
      return;
    }

    const newStatus = destination.droppableId;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["todo", "in-progress", "complete"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 rounded-md shadow-md min-h-[500px] ${
                  snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <h2 className="text-lg font-semibold text-gray-700 capitalize mb-4">
                  {status.replace("-", " ")}
                </h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 mb-4 bg-white rounded-md shadow-md ${
                            snapshot.isDragging ? "bg-blue-50" : ""
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-md font-semibold">
                                {task.title}
                              </h3>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => onEdit(task)}
                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => onDelete(task.id)}
                                className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center">
                              <span className="text-gray-500">Due:</span>
                              <span className="font-medium">
                                {task.dueDate}
                              </span>
                            </p>
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
