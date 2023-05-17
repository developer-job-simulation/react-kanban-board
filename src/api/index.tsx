const apiUrl = "http://localhost:3001";

export const fetchKanbanTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`);
  if (response.ok) {
    const tasks = await response.json();
    return tasks;
  } else {
    throw new Error(response.statusText);
  }
};

export const updateKanbanTasks = async (tasks: any) => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
};
