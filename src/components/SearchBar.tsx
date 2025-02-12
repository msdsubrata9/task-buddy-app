import React from "react";

const SearchBar = () => {
  return (
    <div className="flex gap-4">
      <input
        className="border-2 border-black p-4"
        type="text"
        placeholder="Search..."
      />
      <button className="bg-purple-500 text-white px-8 py-4 rounded-full">
        ADD TASK
      </button>
    </div>
  );
};

export default SearchBar;
