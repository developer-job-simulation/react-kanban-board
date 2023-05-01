import React, { useEffect, useState } from 'react';
import './App.css';
import KanbanColumn from './components/KanbanColumn';
import { Column, DraggableTask, DraggedTaskInfo, Task } from './types';
import { fetchKanbanTasks } from './api/index';

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
    fetchKanbanTasks().then((tasks) => {
      setKanbanColumns(tasks);
      console.log('rerended');
      localStorage.setItem('initialdata', JSON.stringify(tasks));
    });
  }, []);
  const [createplaceholder, setCreatePlaceholder] = useState<boolean>(false);

  let tempo_item = JSON.parse(localStorage.getItem('initialdata') || '');

  // Hint: You will need these states for dragging and dropping tasks
  const [draggedTaskInfo, setDraggedTaskInfo] =
    useState<DraggedTaskInfo | null>(null);

  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null);

  const updateColumns = (e: React.DragEvent, column: Column) => {
    if (draggedTaskInfo) {
      let sourceCln = e.dataTransfer.getData('sourceColumn');
      tempo_item[sourceCln].splice(
        tempo_item[sourceCln].findIndex(function (element: Task) {
          return element.id === draggedTaskInfo.task.id;
        }),
        1
      );
      tempo_item[column].push(draggedTaskInfo.task);

      localStorage.setItem('initialdata', JSON.stringify(tempo_item));
      setKanbanColumns(tempo_item);
      setCreatePlaceholder(false);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempo_item),
      };
      fetch('http://localhost:3001/tasks', requestOptions);
    }
  };

  const handleTaskDragStart = (
    task: DraggableTask,
    column: Column,
    e: React.DragEvent
  ) => {
    // TODO: Implement functionality for when the drag starts
    let neededInfo = { task, column };

    e.dataTransfer.setData('sourceColumn', neededInfo.column);

    setDraggedTaskInfo({ task, column });
  };

  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();
    // TODO: Implement functionality for when an item is being dragged over a column
    // Hint: Remember to check if the item is being dragged over a new column
    // console.log('item is being dragged over a column', e);
    // setHoveredColumn(column)

    if (draggedTaskInfo?.column !== column) {
      setCreatePlaceholder(true);
      setHoveredColumn(column);
      console.log(createplaceholder);
    } else {
      setCreatePlaceholder(false);
      console.log(createplaceholder);
      setHoveredColumn(column);
    }
  };

  const handleTaskDrop = (e: React.DragEvent, column: Column) => {
    e.preventDefault();

    // TODO: Implement functionality for when the item is dropped
    // Hint: Make sure to handle the cases when the item is dropped in the same column or in a new column

    if (column === 'Backlog') {
      if (draggedTaskInfo?.column === 'Backlog') return;
      updateColumns(e, column);
    } else if (column === 'In Progress') {
      if (draggedTaskInfo?.column === 'In Progress') return;
      updateColumns(e, column);
    } else if (column === 'In Review') {
      if (draggedTaskInfo?.column === 'In Review') return;
      updateColumns(e, column);
    } else if (column === 'Done') {
      if (draggedTaskInfo?.column === 'Done') return;
      updateColumns(e, column);
    }
  };

  const getTasksForColumn = (column: Column): DraggableTask[] => {
    // TODO: Handle the bug where card dragged over itself shows duplicate
    // Hint: Consider how you can use the dragInfo and overColumn states to prevent this

    return kanbanColumns[column];
  };

  const handleTaskDragEnd = () => {
    // TODO: Implement functionality for when the drag ends
    // Hint: Remember to handle the case when the item is released back to its current column
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
          createplaceholder={createplaceholder}
          draggedTaskInfo={draggedTaskInfo}
          hoveredColumn={hoveredColumn}

          // onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Progress"
          tasks={getTasksForColumn('In Progress')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          createplaceholder={createplaceholder}
          draggedTaskInfo={draggedTaskInfo}
          hoveredColumn={hoveredColumn}

          // onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="In Review"
          tasks={getTasksForColumn('In Review')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          createplaceholder={createplaceholder}
          draggedTaskInfo={draggedTaskInfo}
          hoveredColumn={hoveredColumn}

          // onTaskDragEnd={handleTaskDragEnd}
        />
        <KanbanColumn
          title="Done"
          tasks={getTasksForColumn('Done')}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragOver={handleTaskDragOver}
          onTaskDrop={handleTaskDrop}
          createplaceholder={createplaceholder}
          draggedTaskInfo={draggedTaskInfo}
          hoveredColumn={hoveredColumn}

          // onTaskDragEnd={handleTaskDragEnd}
        />
      </div>
    </main>
  );
}
