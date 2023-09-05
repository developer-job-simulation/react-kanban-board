const apiUrl = "http://localhost:3001";

export const fetchKanbanTasks = async () =>
{
  // TODO: Implement functionality to fetch tasks from the server
  const res = await fetch(`${apiUrl}/tasks`);
  const data = await res.json();
  return data;
};

export const updateKanbanTasks = async (tasks: any) =>
{
  const res = await fetch(`${apiUrl}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tasks)
  });
  const data = await res.json();
  return data;
  // TODO: Save the new order of the items when tasks are modified to the server
  // Hint: You may want to use the fetch API with a "PUT" method
};
