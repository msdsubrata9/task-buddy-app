import React from "react";

interface FilterProps {
  onFilterByCategory: (category: string) => void;
  onFilterByDueDate: (dueDate: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  onFilterByCategory,
  onFilterByDueDate,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterByCategory(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByDueDate(e.target.value);
  };

  return (
    <div className="flex gap-3 items-center">
      <span>Filter By:</span>
      <select onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <input
        type="date"
        onChange={handleDueDateChange}
        className="border-2 border-black p-4"
      />
    </div>
  );
};

export default Filter;
