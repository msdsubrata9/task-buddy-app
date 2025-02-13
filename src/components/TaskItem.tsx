import React from "react";
import { Task } from "../utils/types";

interface TaskItemProps {
  task: Task;
  selectedTasks: Set<string>;
  onTaskSelect: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  selectedTasks,
  onTaskSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-3 bg-white rounded-md shadow-md mb-3">
      <div>
        <input
          className="mr-2"
          type="checkbox"
          checked={selectedTasks.has(task.id)}
          onChange={() => onTaskSelect(task.id)}
        />
        {task.title}
      </div>
      <div>{task.dueDate}</div>
      <div>{task.status}</div>
      <div>{task.category}</div>
      <div className="flex gap-2">
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
  );
};

export default TaskItem;
