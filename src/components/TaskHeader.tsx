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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-200 rounded-md font-semibold text-gray-700 w-full">
        <div>Task Name</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={onSortOrderChange}
        >
          Due On
          <button className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</button>
        </div>
        <div className="hidden md:block">Task Status</div>
        <div className="hidden md:block">Task Category</div>
      </div>
    </div>
  );
};

export default TaskHeader;
