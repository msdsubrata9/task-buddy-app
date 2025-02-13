import React from "react";

interface TaskHeaderProps {
  sortOrder: "asc" | "desc";
  onSortOrderChange: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="grid grid-cols-5 gap-8 p-4 bg-gray-200 rounded-md font-semibold text-gray-700 w-full">
        <div>Task Name</div>
        <div className="flex items-center">
          Due On
          <button onClick={onSortOrderChange} className="ml-2">
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
        <div>Task Status</div>
        <div>Task Category</div>
      </div>
    </div>
  );
};

export default TaskHeader;
