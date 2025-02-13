import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskItem from "./TaskItem";
import { Task } from "../utils/types";

interface TaskAccordionProps {
  status: string;
  tasks: Task[];
  expanded: string[];
  onAccordionChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  selectedTasks: Set<string>;
  onTaskSelect: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskAccordion: React.FC<TaskAccordionProps> = ({
  status,
  tasks,
  expanded,
  onAccordionChange,
  selectedTasks,
  onTaskSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <Accordion
      key={status}
      expanded={expanded.includes(status)}
      onChange={onAccordionChange(status)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          {status.replace("-", " ")}
        </h2>
      </AccordionSummary>
      <AccordionDetails>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              selectedTasks={selectedTasks}
              onTaskSelect={onTaskSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks in this section.</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskAccordion;
