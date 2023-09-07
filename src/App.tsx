import React, { useEffect, useState } from "react";
import "./App.css";
import KanbanColumn from "./components/KanbanColumn";
import { Column, DraggableTask, DraggedTaskInfo, Task } from "./types";
import { fetchKanbanTasks, updateKanbanTasks } from "./api";

export default function App() {
  const [kanbanColumns, setKanbanColumns] = useState<
    Record<Column, DraggableTask[]>
  >({
    Backlog: [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  });

  // Fetch Tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchKanbanTasks();
        setKanbanColumns(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [draggedTaskInfo, setDraggedTaskInfo] =
    useState<DraggedTaskInfo | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null);

  // set the dragged task and the initial column
  const handleTaskDragStart = (task: Task, column: Column) => {
    setDraggedTaskInfo({ task, column });
  };

  // drag the task and check if its hovered over a new column
  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();

    // check if the item is being dragged over a new column
    if (draggedTaskInfo && draggedTaskInfo.column !== column) {
      setHoveredColumn(column);
    }
  };

  // dropping the task, check if its a new column and update states
  const handleTaskDrop = (column: Column) => {
    if (draggedTaskInfo) {
      const { task, column: sourceColumn } = draggedTaskInfo;

      // Check if the task was dropped into a new column
      if (sourceColumn !== column) {
        // Remove the task from the source column
        const updatedSourceColumn = kanbanColumns[sourceColumn].filter(
          (t) => t.id !== task.id
        );

        // Add the task to the destination column
        const updatedDestinationColumn = [...kanbanColumns[column], task];

        // Update the state with the new column data
        setKanbanColumns({
          ...kanbanColumns,
          [sourceColumn]: updatedSourceColumn,
          [column]: updatedDestinationColumn,
        });

        updateKanbanTasks({
          ...kanbanColumns,
          [sourceColumn]: updatedSourceColumn,
          [column]: updatedDestinationColumn,
        });
      }

      setDraggedTaskInfo(null);
      setHoveredColumn(null);
    }
  };

  const getTasksForColumn = (column: Column): DraggableTask[] => {
    // Handle the bug where card dragged over itself shows duplicate
    if (draggedTaskInfo && hoveredColumn === column) {
      // If a task is being dragged over this column, exclude it from the list
      return kanbanColumns[column].filter(
        (task) => task.id !== draggedTaskInfo.task.id
      );
    } else {
      return kanbanColumns[column];
    }
  };

  const handleTaskDragEnd = () => {};

  return (
    <main className="overflow-x-auto">
      <h1 className="text-left text-4xl font-bold p-10 pb-0">
        Codebase Mentor Kanban Board
      </h1>
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
