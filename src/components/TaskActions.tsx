import React from "react";

interface TaskActionsProps {
  selectedTasks: Set<string>;
  onBatchStatusChange: (status: string) => void;
  onBatchDelete: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  selectedTasks,
  onBatchStatusChange,
  onBatchDelete,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-400 p-4 rounded-md shadow-md z-10">
      <select
        onChange={(e) => onBatchStatusChange(e.target.value)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        <option value="">Change Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="complete">Complete</option>
      </select>
      <button
        onClick={onBatchDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Delete Selected
      </button>
    </div>
  );
};

export default TaskActions;
