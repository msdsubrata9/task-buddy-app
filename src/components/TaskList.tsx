import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import TaskModal from "./TaskModal"; // Import the modal component
import TaskBoard from "./TaskBoard"; // Import the TaskBoard component
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../services/tasks"; // Include createTask and updateTask services
import { Task } from "../utils/types";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBoardView, setBoardView] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [expanded, setExpanded] = useState<string[]>([
    "todo",
    "in-progress",
    "complete",
  ]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data as Task[]);
    };
    loadTasks();
  }, []);

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = async (task: Task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await createTask(task);
    }
    const data = await fetchTasks();
    setTasks(data as Task[]); // Refresh task list after adding or editing
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterByCategory = (category: string) => {
    setFilterCategory(category);
  };

  const handleFilterByDueDate = (dueDate: string) => {
    setFilterDueDate(dueDate);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded
          ? [...prevExpanded, panel]
          : prevExpanded.filter((p) => p !== panel)
      );
    };

  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? task.category === filterCategory
      : true;
    const matchesDueDate = filterDueDate
      ? task.dueDate === filterDueDate
      : true;
    return matchesQuery && matchesCategory && matchesDueDate;
  });

  return (
    <div>
      <Navbar setBoardView={setBoardView} />
      <div className="flex items-center m-7 justify-between">
        <Filter
          onFilterByCategory={handleFilterByCategory}
          onFilterByDueDate={handleFilterByDueDate}
        />
        <SearchBar
          onSearch={handleSearch}
          onAddTask={() => {
            setSelectedTask(null);
            setModalOpen(true);
          }}
        />
      </div>

      {!isBoardView ? (
        <>
          {/* Table Headers */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 rounded-md font-semibold text-gray-700 mb-4">
            <div>Task Name</div>
            <div>Due On</div>
            <div>Task Status</div>
            <div>Task Category</div>
          </div>

          {/* Accordion Sections */}
          <div>
            {["todo", "in-progress", "complete"].map((status) => (
              <Accordion
                key={status}
                expanded={expanded.includes(status)}
                onChange={handleAccordionChange(status)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h2 className="text-lg font-semibold text-gray-700 capitalize">
                    {status.replace("-", " ")}
                  </h2>
                </AccordionSummary>
                <AccordionDetails>
                  {getTasksByStatus(status).length > 0 ? (
                    getTasksByStatus(status).map((task) => (
                      <div
                        key={task.id}
                        className="grid grid-cols-4 gap-4 p-3 bg-white rounded-md shadow-md mb-3"
                      >
                        <div>{task.title}</div>
                        <div>{task.dueDate}</div>
                        <div>{task.status}</div>
                        <div>{task.category}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="px-2 py-1 bg-blue-500 text-white rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No tasks in this section.</p>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </>
      ) : (
        <TaskBoard
          tasks={filteredTasks}
          setTasks={setTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TaskList;
