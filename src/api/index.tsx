const apiUrl = 'http://localhost:3001';

export const fetchKanbanTasks = async () => {
  // TODO: Implement functionality to fetch tasks from the server
  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:3001/tasks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let data = await fetchTasks();
  return data;
};

export const updateKanbanTasks = async (tasks: any) => {
  // TODO: Save the new order of the items when tasks are modified to the server
  // Hint: You may want to use the fetch API with a "PUT" method
  const apiUrl = 'http://localhost:3001/tasks';
  fetch(apiUrl, {
    method: 'PUT', // or 'PUT' depending on your server's requirements
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasks),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error updating task on the server.');
      }
      // Handle the response as needed
    })
    .catch((error) => {
      console.error(error);
      // Handle the error as needed
    });
};
