import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchTasks, updateTasks } from "./api";
import KanbanColumn from "./components/KanbanColumn";
import { Column, DraggableTask, DraggedTaskInfo, Task } from "./types";

export default function App() {
  const [kanbanColumns, setKanbanColumns] = useState<Record<Column, DraggableTask[]>>({
    Backlog: [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  });

  // Fetch Tasks
  useEffect(() => {
    (async () => {
      const tasks = await fetchTasks();
      setKanbanColumns(tasks);
    })();
  }, []);

  const [draggedTaskInfo, setDraggedTaskInfo] = useState<DraggedTaskInfo | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null);

  const handleTaskDragStart = (task: Task, column: Column) => {
    setDraggedTaskInfo({ task, column });
  };

  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();
    if (column !== hoveredColumn) {
      setHoveredColumn(column);
    }
  };

  const handleTaskDrop = (column: Column) => {
    if (draggedTaskInfo) {
      // If the task is dropped in a different column, remove it from the old one and add it to the new one.
      if (column !== draggedTaskInfo.column) {
        const taskIndex = kanbanColumns[draggedTaskInfo.column].findIndex(
          (task) => task.id === draggedTaskInfo.task.id
        );
        if (taskIndex > -1) {
          const newColumnTasks = [...kanbanColumns[column], draggedTaskInfo.task];
          const oldColumnTasks = [...kanbanColumns[draggedTaskInfo.column]];
          oldColumnTasks.splice(taskIndex, 1);
          const newState = { ...kanbanColumns, [column]: newColumnTasks, [draggedTaskInfo.column]: oldColumnTasks };
          setKanbanColumns(newState);
          // Update the tasks in the db
          updateTasks(newState).catch((error) => console.error(error));
        }
      }
    }

    setDraggedTaskInfo(null); // Reset dragInfo state
    setHoveredColumn(null); // Reset overColumn state
  };

  const getTasksForColumn = (column: Column): DraggableTask[] => {
    let tasks = kanbanColumns[column];
    if (draggedTaskInfo && hoveredColumn === column && column !== draggedTaskInfo.column) {
      tasks = [...tasks, { ...draggedTaskInfo.task, isDragging: true }];
    }
    return tasks;
  };

  const handleTaskDragEnd = () => {
    setDraggedTaskInfo(null); // Reset dragInfo state
    setHoveredColumn(null); // Reset overColumn state
  };

  return (
    <main className="overflow-x-auto">
      <h1 className="text-left text-4xl font-bold p-10 pb-0">Codebase Mentor Kanban Board</h1>
      <div className="flex justify-between p-10 gap-x-4 min-w-max">
        <KanbanColumn
          title="Backlog"
          tasks={getTasksForColumn("Backlog")}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Progress"
          tasks={getTasksForColumn("In Progress")}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Review"
          tasks={getTasksForColumn("In Review")}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="Done"
          tasks={getTasksForColumn("Done")}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
      </div>
    </main>
  );
}
