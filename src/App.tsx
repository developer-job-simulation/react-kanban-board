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

  useEffect(() => {
    fetchKanbanTasks().then((tasks) => {
      setKanbanColumns(tasks);
      localStorage.setItem('initialdata', JSON.stringify(tasks));
      
    });
  }, []);
  const [createplaceholder, setCreatePlaceholder] = useState<boolean>(false);

  let empty_local_data = {
    Backlog: [],
    'In Progress': [],
    'In Review': [],
    Done: [],
  };

  let tempo_item =
    JSON.parse(localStorage.getItem('initialdata') || 'false') ||
    empty_local_data;

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
      updateKanbanTasks(requestOptions);
    }
  };

  const handleTaskDragStart = (
    task: DraggableTask,
    column: Column,
    e: React.DragEvent
  ) => {
    let neededInfo = { task, column };
    e.dataTransfer.setData('sourceColumn', neededInfo.column);
    setDraggedTaskInfo({ task, column });
  };

  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();

    if (draggedTaskInfo?.column !== column) {
      setCreatePlaceholder(true);
      setHoveredColumn(column);
    } else {
      setCreatePlaceholder(false);

      setHoveredColumn(column);
    }
  };

  const handleTaskDrop = (e: React.DragEvent, column: Column) => {
    e.preventDefault();

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
    return kanbanColumns[column];
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
        />
      </div>
    </main>
  );
}
