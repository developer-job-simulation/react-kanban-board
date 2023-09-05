import React, { useEffect, useState } from "react";
import "./App.css";
import KanbanColumn from "./components/KanbanColumn";
import { Column, DraggableTask, DraggedTaskInfo, Task } from "./types";
import { fetchKanbanTasks } from "./api";

export default function App()
{
  const [kanbanColumns, setKanbanColumns] = useState<Record<Column, DraggableTask[]>>({
    Backlog: [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  });

  // Fetch Tasks
  useEffect(() =>
  {
    // TODO: Pull state from json-server
    const fetchTasks = async () =>
    {
      const data = await fetchKanbanTasks();
      console.log("tasks", data);

      setKanbanColumns(data);
    };

    fetchTasks();
    // Hint: You may want to use the fetchTasks function from api/index.tsx
  }, []);

  // Hint: You will need these states for dragging and dropping tasks
  const [draggedTaskInfo, setDraggedTaskInfo] = useState<DraggedTaskInfo | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null);

  const handleTaskDragStart = (task: Task, column: Column) =>
  {
    setDraggedTaskInfo({ task, column });
    // TODO: Implement functionality for when the drag starts
  };

  const handleTaskDragOver = (e: React.DragEvent, column: Column) =>
  {
    e.preventDefault();

    setHoveredColumn(column);
    console.log("handleTaskDrop", column);
    // const originalColumns = { ...kanbanColumns };
    // originalColumns[hoveredColumn!].push({ ...draggedTaskInfo!.task, isDragging: true });


    // setKanbanColumns(originalColumns);

    // TODO: Implement functionality for when an item is being dragged over a column
    // Hint: Remember to check if the item is being dragged over a new column
  };

  const handleTaskDrop = (column: Column) =>
  {
  
    // TODO: Implement functionality for when the item is dropped
    // Hint: Make sure to handle the cases when the item is dropped in the same column or in a new column
  };

  const getTasksForColumn = (column: Column): DraggableTask[] =>
  {
    // console.log("getTasksForColumn", column);

    // TODO: Handle the bug where card dragged over itself shows duplicate
    // Hint: Consider how you can use the dragInfo and overColumn states to prevent this
    return kanbanColumns[column];
    // return [{ id: "1", name: "Task 1", isDragging: false }];
  };

  const handleTaskDragEnd = () =>
  {
    console.log("handleTaskDragEnd");
    const originalColumns = { ...kanbanColumns };

    originalColumns[draggedTaskInfo!.column] = originalColumns[draggedTaskInfo!.column].filter(task => task.id !== draggedTaskInfo?.task.id);
    originalColumns[hoveredColumn!].push(draggedTaskInfo!.task);


    setKanbanColumns(originalColumns);


    // TODO: Implement functionality for when the drag ends
    // Hint: Remember to handle the case when the item is released back to its current column
  };

  return (
    <main className="overflow-x-auto">
      <h1 className="p-10 pb-0 text-4xl font-bold text-left">Codebase Mentor Kanban Board</h1>
      <div className="flex gap-x-4 justify-between p-10 min-w-max">
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
