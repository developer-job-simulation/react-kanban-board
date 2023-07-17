import React, { useEffect, useState } from 'react';
import './App.css';
import KanbanColumn from './components/KanbanColumn';
import { Column, DraggableTask, DraggedTaskInfo, Task } from './types';

import { fetchKanbanTasks, updateKanbanTasks } from './api/index';

export default function App() {
  const [kanbanColumns, setKanbanColumns] = useState<
    Record<Column, DraggableTask[]>
  >({
    Backlog: [],
    'In Progress': [],
    'In Review': [],
    Done: [],
  });

  // Fetch Tasks
  useEffect(() => {
    // TODO: Pull state from json-server
    // Hint: You may want to use the fetchTasks function from api/index.tsx
    const getDataUpdated = async () => {
      let data = await fetchKanbanTasks();

      if (JSON.stringify(data) !== JSON.stringify(kanbanColumns)) {
        setKanbanColumns(data);
      }
    };
    getDataUpdated();
  }, []);

  // Hint: You will need these states for dragging and dropping tasks
  const [draggedTaskInfo, setDraggedTaskInfo] =
    useState<DraggedTaskInfo | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null);

  const handleTaskDragStart = (task: Task, column: Column) => {
    // TODO: Implement functionality for when the drag starts
    const draggedTaskInfo: DraggedTaskInfo = {
      task,
      column,
    };
    setDraggedTaskInfo(draggedTaskInfo);
  };

  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();
    // TODO: Implement functionality for when an item is being dragged over a column
    // Hint: Remember to check if the item is being dragged over a new column
    if (draggedTaskInfo?.column != column) {
      setHoveredColumn(column);
    }
  };

  const handleTaskDrop = (column: Column) => {
    // TODO: Implement functionality for when the item is dropped
    // Hint: Make sure to handle the cases when the item is dropped in the same column or in a new column

    const findIndexOfDeletedTask = (task, allTasks) => {
      for (let i = 0; i < allTasks.length; i++) {
        if (task.id === allTasks[i].id) return i;
      }
    };

    let copyKanbanColumns = structuredClone(kanbanColumns);

    if (draggedTaskInfo != null && draggedTaskInfo?.column != column) {
      copyKanbanColumns[column].push(draggedTaskInfo.task);
      let index = findIndexOfDeletedTask(
        draggedTaskInfo.task,
        copyKanbanColumns[draggedTaskInfo.column]
      );
      if (index != undefined && index > -1) {
        copyKanbanColumns[draggedTaskInfo.column].splice(index, 1);
      }
      updateKanbanTasks(copyKanbanColumns);
      setKanbanColumns(copyKanbanColumns);
    }
  };

  const getTasksForColumn = (column: Column): DraggableTask[] => {
    // TODO: Handle the bug where card dragged over itself shows duplicate
    let thisColumnData = kanbanColumns[column];
    // Hint: Consider how you can use the dragInfo and overColumn states to prevent this
    // return [{ id: '1', name: 'Task 1', isDragging: false }];

    return thisColumnData;
  };

  const handleTaskDragEnd = () => {
    // TODO: Implement functionality for when the drag ends
    // Hint: Remember to handle the case when the item is released back to its current column
    setDraggedTaskInfo(null);
    setHoveredColumn(null);
  };

  return (
    <main className="overflow-x-auto">
      <h1 className="text-left text-4xl font-bold p-10 pb-0">
        Codebase Mentor Kanban Board
      </h1>
      <div className="flex justify-between p-10 gap-x-4 min-w-max">
        <KanbanColumn
          title="Backlog"
          tasks={getTasksForColumn('Backlog')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Progress"
          tasks={getTasksForColumn('In Progress')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Review"
          tasks={getTasksForColumn('In Review')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="Done"
          tasks={getTasksForColumn('Done')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          onTaskDragEnd={handleTaskDragEnd}
        />
      </div>
    </main>
  );
}
