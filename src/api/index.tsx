const apiUrl = "http://localhost:3001"

export const fetchKanbanTasks = async () => {
  try {
    const response = await fetch(`${apiUrl}/tasks`)
    const tasks = await response.json()
    return tasks
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

export const updateKanbanTasks = async (tasks: any) => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    })
    const updatedTasks = await response.json()
    return updatedTasks
  } catch (error) {
    console.error("Error updating tasks:", error)
    throw error
  }
}
