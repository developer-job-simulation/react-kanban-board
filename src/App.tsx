import React, { useEffect, useState } from "react"
import "./App.css"
import KanbanColumn from "./components/KanbanColumn"
import { Column, DraggableTask, DraggedTaskInfo, Task } from "./types"
import { fetchKanbanTasks, updateKanbanTasks } from "./api"

export default function App() {
  //prettier-ignore
  const [kanbanColumns, setKanbanColumns] = useState<
    Record<Column, DraggableTask[]>
  >({
    "Backlog": [],
    "In Progress": [],
    "In Review": [],
    "Done": []
  })

  // Fetch Tasks
  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await fetchKanbanTasks()
        setKanbanColumns(tasks)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }
    getTasks()
  }, [])

  const [draggedTaskInfo, setDraggedTaskInfo] =
    useState<DraggedTaskInfo | null>(null)
  const [hoveredColumn, setHoveredColumn] = useState<Column | null>(null)

  const handleTaskDragStart = (task: Task, column: Column) => {
    setDraggedTaskInfo({ task: task, column: column })
    setHoveredColumn(column)
  }

  const handleTaskDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault()

    if (hoveredColumn !== column) {
      setHoveredColumn(column)
    }

    const { task, column: fromColumn } = draggedTaskInfo
    const newColumns = { ...kanbanColumns }

    // remove task from old column
    for (const col in newColumns) {
      if (col !== column && col != fromColumn) {
        const index = newColumns[col].findIndex((t) => t.id === task.id)
        if (index !== -1) {
          newColumns[col].splice(index, 1)
        }
      }
    }

    // add task to new column
    const index = newColumns[hoveredColumn].findIndex((t) => t.id === task.id)
    if (index === -1) {
      newColumns[hoveredColumn].push({
        ...task,
        isDragging: true
      })
    }

    setKanbanColumns(newColumns)
  }

  const handleTaskDrop = (column: Column) => {
    const { task, column: fromColumn } = draggedTaskInfo
    const newColumns = { ...kanbanColumns }

    // remove task from old columns
    newColumns[column] = newColumns[column].filter((t) => t.id !== task.id)
    newColumns[fromColumn] = newColumns[fromColumn].filter(
      (t) => t.id !== task.id
    )

    newColumns[column].push({ ...task, isDragging: false })

    setKanbanColumns(newColumns)
    updateKanbanTasks(newColumns)

    setDraggedTaskInfo(null)
    setHoveredColumn(null)
  }

  const getTasksForColumn = (column: Column): DraggableTask[] => {
    return kanbanColumns[column]
  }

  const handleTaskDragEnd = () => {
    // for dragging off the board
    const { task, column: fromColumn } = draggedTaskInfo
    const newColumns = { ...kanbanColumns }

    // remove task from old columns
    for (const col in newColumns) {
      if (col != fromColumn) {
        const index = newColumns[col].findIndex((t) => t.id === task.id)
        if (index !== -1) {
          newColumns[col].splice(index, 1)
        }
      }
    }

    setKanbanColumns(newColumns)

    setDraggedTaskInfo(null)
    setHoveredColumn(null)
  }

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
  )
}
