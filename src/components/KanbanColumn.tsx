import React, { useEffect } from 'react';
import { Column, DraggableTask, DraggedTaskInfo, Task } from '../types';

interface KanbanColumnProps {
  title: Column;
  tasks: DraggableTask[];
  onTaskDragStart: (task: Task, column: Column, e: React.DragEvent) => void;
  onTaskDragOver: (e: React.DragEvent, column: Column) => void;
  onTaskDrop: (e: React.DragEvent, column: Column) => void;
  createplaceholder: boolean;
  draggedTaskInfo: DraggedTaskInfo | null;
  hoveredColumn: Column | null;
}

export default function KanbanColumn({
  title,
  tasks,
  onTaskDragStart,
  onTaskDragOver,
  onTaskDrop,
  createplaceholder,
  draggedTaskInfo,
  hoveredColumn,
}: KanbanColumnProps) {
  useEffect(() => {}, [createplaceholder]);

  return (
    <div
      className="flex flex-col w-1/4 min-w-[300px] bg-gray-200 rounded p-4"
      onDragOver={(e) => onTaskDragOver(e, title)}
      onDrop={(e) => onTaskDrop(e, title)}
    >
      <h2 className="font-bold mb-2">{title}</h2>
      <ul>
        {tasks && tasks.map((task) => (
          <li
            key={task.id}
            className={`bg-white p-2 rounded cursor-pointer mb-2 shadow ${
              task.isDragging ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={(e) => onTaskDragStart(task, title, e)}
          >
            {task.name}
          </li>
        ))}
        {createplaceholder && draggedTaskInfo && hoveredColumn === title ? (
          <li
            className={`bg-white p-2 rounded cursor-pointer mb-2 shadow ${'opacity-50'}`}
          >
            {draggedTaskInfo.task.name}
          </li>
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
}
