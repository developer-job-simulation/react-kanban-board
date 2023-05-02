const apiUrl = 'http://localhost:3001';

export const fetchKanbanTasks = async () => {
  // TODO: Implement functionality to fetch tasks from the server

  const tasks = await (await fetch(`${apiUrl}/tasks`)).json();
  return tasks;
};

export const updateKanbanTasks = async (tasks: any) => {
  // TODO: Save the new order of the items when tasks are modified to the server
  // Hint: You may want to use the fetch API with a "PUT" method
  fetch(`${apiUrl}/tasks`, tasks);
};
