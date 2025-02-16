import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import TaskModal from "./TaskModal";
import TaskBoard from "./TaskBoard";
import SearchBar from "./SearchBar";
import TaskActions from "./TaskActions";
import TaskAccordion from "./TaskAccordion";
import TaskHeader from "./TaskHeader";
import useWindowSize from "../utils/useWindowSize";
import {
  fetchTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../services/tasks";
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
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { width } = useWindowSize();
  const isMobile = width <= 768;

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

  const handleBatchDelete = async () => {
    const tasksToDelete = Array.from(selectedTasks);
    await Promise.all(tasksToDelete.map((id) => deleteTask(id)));
    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  };

  const handleBatchStatusChange = async (status: string) => {
    const tasksToUpdate = Array.from(selectedTasks);
    await Promise.all(
      tasksToUpdate.map((id) =>
        updateTask({ ...tasks.find((task) => task.id === id)!, status })
      )
    );
    const data = await fetchTasks();
    setTasks(data as Task[]);
    setSelectedTasks(new Set());
  };

  const handleSave = async (task: Task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await createTask(task);
    }
    const data = await fetchTasks();
    setTasks(data as Task[]);
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
      setExpanded(
        isExpanded ? [...expanded, panel] : expanded.filter((p) => p !== panel)
      );
    };

  const handleTaskSelect = (id: string) => {
    setSelectedTasks((prevSelectedTasks) => {
      const newSelectedTasks = new Set(prevSelectedTasks);
      if (newSelectedTasks.has(id)) {
        newSelectedTasks.delete(id);
      } else {
        newSelectedTasks.add(id);
      }
      return newSelectedTasks;
    });
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
  });

  const filteredTasks = sortedTasks.filter((task) => {
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
      <div className="flex flex-col md:flex-row items-center m-7 justify-between">
        <Filter
          onFilterByCategory={handleFilterByCategory}
          onFilterByDueDate={handleFilterByDueDate}
        />
        <div className="flex items-center mt-4 md:mt-0">
          <SearchBar
            onSearch={handleSearch}
            onAddTask={() => {
              setSelectedTask(null);
              setModalOpen(true);
            }}
          />
        </div>
      </div>

      {selectedTasks.size > 0 && (
        <TaskActions
          selectedTasks={selectedTasks}
          onBatchStatusChange={handleBatchStatusChange}
          onBatchDelete={handleBatchDelete}
        />
      )}

      {!isBoardView && !isMobile && (
        <TaskHeader
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
      )}

      {!isBoardView || isMobile ? (
        <div>
          {["todo", "in-progress", "complete"].map((status) => (
            <TaskAccordion
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              expanded={expanded}
              onAccordionChange={handleAccordionChange}
              selectedTasks={selectedTasks}
              onTaskSelect={handleTaskSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <TaskBoard
          tasks={filteredTasks}
          setTasks={setTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
