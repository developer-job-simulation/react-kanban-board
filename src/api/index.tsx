const apiUrl = "http://localhost:3001";

export const fetchTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`);
  const data = await response.json();
  return data;
};

export const updateTasks = async (tasks: any) => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  });

  const data = await response.json();
  return data;
};
