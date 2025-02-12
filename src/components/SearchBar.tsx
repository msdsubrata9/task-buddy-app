import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAddTask: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onAddTask }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="flex gap-4">
      <input
        className="border-2 border-black p-4"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button
        className="bg-purple-500 text-white px-8 py-4 rounded-full"
        onClick={onAddTask}
      >
        ADD TASK
      </button>
    </div>
  );
};

export default SearchBar;
