import React from "react";

const Filter = () => {
  return (
    <div className="flex gap-3">
      <span>Filter By:</span>
      <select>
        <option>Category</option>
      </select>
      <select>
        <option>Due Date</option>
      </select>
    </div>
  );
};

export default Filter;
