import React from 'react';
import { Column, DraggableTask, Task } from '../types';

interface KanbanColumnProps {
  title: Column;
  tasks: DraggableTask[];
  onTaskDragStart: (task: Task, column: Column) => void;
  onTaskDragOver: (e: React.DragEvent, column: Column) => void;
  onTaskDrop: (e: React.DragEvent, column: Column) => void;
  onTaskDragEnd: () => void;
  e:React.DragEvent
}

export default function KanbanColumn({
  title,
  tasks,
  onTaskDragStart,
  onTaskDragOver,
  onTaskDrop,
  onTaskDragEnd,
e
}: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col w-1/4 min-w-[300px] bg-gray-200 rounded p-4"
      onDragOver={(e) => onTaskDragOver(e, title)}
      onDrop={(e) => onTaskDrop(e, title)}
    >
      <h2 className="font-bold mb-2">{title}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`bg-white p-2 rounded cursor-pointer mb-2 shadow ${
              task.isDragging ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={(e) => onTaskDragStart(task, title,e)}
            onDragEnd={onTaskDragEnd}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
