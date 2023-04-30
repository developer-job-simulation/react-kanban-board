export interface Task {
  id: string;
  name: string;
}
export type Column = "Backlog" | "In Progress" | "In Review" | "Done";

export interface DraggedTaskInfo {
  task: Task;
  column: Column;
}


export type DraggableTask = Task & { isDragging?: boolean | undefined };
