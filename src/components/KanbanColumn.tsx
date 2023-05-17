import React, { useEffect } from "react";
import { Column, DraggableTask, Task } from "../types";

interface KanbanColumnProps {
  title: Column;
  tasks: DraggableTask[];
  onTaskDragStart: (task: Task, column: Column) => void;
  onTaskDragOver: (e: React.DragEvent, column: Column) => void;
  onTaskDrop: (column: Column) => void;
  onTaskDragEnd: () => void;
}

export default function KanbanColumn({
  title,
  tasks,
  onTaskDragStart,
  onTaskDragOver,
  onTaskDrop,
  onTaskDragEnd,
}: KanbanColumnProps) {

  return (
    <div
      className="flex flex-col w-1/4 min-w-[300px] bg-gray-200 rounded p-4"
      onDragOver={(e) => onTaskDragOver(e, title)}
      onDrop={() => onTaskDrop(title)}
    >
      <h2 className="font-bold mb-2">{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`bg-white p-2 rounded mb-2 shadow ${task.isDragging ? "opacity-50" : ""}`}
            draggable
            onDragStart={() => onTaskDragStart(task, title)}
            onDragEnd={onTaskDragEnd}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
