const apiUrl = "http://localhost:3001";

export const fetchKanbanTasks = async () => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateKanbanTasks = async (tasks: any) => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });

    if (!response.ok) {
      throw new Error("Failed to update tasks");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
