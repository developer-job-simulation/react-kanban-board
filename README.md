[![banner](https://og-playground.vercel.app/?share=zVRpa9wwEP0rQlA2AXt97JG1SQolLSWFQmka-sUQZFsrK5ElIct7dNn_3pF3HW8O6LcS8DXzxqOZN0_a4UKVFKf4suSrTCLU2K2gV7ud-0ao5I0WZJui0VLQzcg7eCvKWWXBGYXhh9655qWtXviI4EzeWFo3ABRUWmp66KFtLF9urxU4pcv1HHbLfeaGFpYr6VAl2lr2aE6KR2ZUK8ubmjAKuCElJ8Jn7g2JzohFh4QoV9aq2kOG5WezmYfmcC-i84MjuvBQPPXQJDk6Qg-56_z8qRAo8Jb_gTWm4dElqIXEt5oUXLIU-fFJ6O8jNRfhIXq_z-THTLrPS14z1JjiKsOVtbpJg6DVQpFyvOaPvKbQwFgZFjhLOysoVF0r2QS2aus8SIIkCe6kWi55Ab3efyMrclsYru29UEzdx-NmxYI4nC70xv9X3FhLlmEYkIVy7qTlVtDSj0I_ihfhZj5fAJgrU1IDeAhGr4vjmGPoD2lSlh0FGY5Dvcnwfh9As9DqUUwv5YSGX0YzvQFK9ZOoBgWR1qrBa-nGfnI6eqWRt3QguKTEDDpIwpKyw2iTiZt14h79-C8isMI5PGYnIz_Ney24hrSuiAEe-WuaP3LrD3F-AYGjV5EgW2Wc1xDZaGKgpB50ykCoowuhn7TRMGm-ouhHpaxCX4kQ1Gw7MgNg8_3SGs0cf5OOxGFbgRl1xE6T_03s8404O27E53s5w5NOsG-MIt-iazgSc9LQ75BVmdMZ9G_sYaXd0dTgdIc7hnG6gKXw4WzE6dQZkKZlOF0S0VAP01o98F9b7Y5bu-4syOOK-lLntMSpNS3de9iSHCIqKoRaKyNKvP8L)](https://codebasementor.com?utm_source=github&utm_medium=javascript-photo-gallery&utm_campaign=github_readmes)

# React Kanban Board by [CodebaseMentor](https://www.codebasementor.com?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes)

![Discord](https://img.shields.io/discord/968893691769000027?color=7289da&label=Discord&logo=discord&logoColor=white&style=for-the-badge)

This is an advanced project in React that allows you to create a dynamic and interactive Kanban board. However, it currently has several issues that need to be resolved:

1. The tasks aren't fetched from the server.
2. The application doesn't handle the onDragStart, onDragOver, onDrop, and onDragEnd events.
   1. Implement handleTaskDragStart, handleTaskDragOver, handleTaskDrop, and handleTaskDragEnd to handle the drag-and-drop events.
   2. Make sure the application doesn't incorrectly show duplicate tasks when dragged over themselves. ` && draggedTaskInfo.column !== column`
   3. Make sure the application doesn't leave a lingering task when dragged over a column but dropped elsewhere. `handleTaskDragEnd`
   4. Make sure the application doesn't delete a task that is dragged over it's current column. `if (column !== draggedTaskInfo.column) {`
3. Task changes aren't being sent to the server.

## Learning Objectives

You will learn and gain experience with:

- Implementing drag-and-drop functionality in React by handling various drag events, such as drag start, drag over, and drop.
- Managing application state during drag-and-drop operations to ensure consistent behavior.
- Updating data on the server after making client-side changes.
- Properly resetting application state after each drag-and-drop operation to ensure the UI behaves correctly.

## How to start working

1. Fork this repo and clone it locally.
1. Open index.html in your browser to see the current state of the project.
1. Fix all the issues (hints are provided as TODO comments in the code)
1. Once all your solutions are complete, create a single Pull Request to this repository
1. Check if your solutions passes our automated tests. You need to create an account on [CodebaseMentor](https://www.codebasementor.com?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes) to do this.

## Need help?

The best way to ask for help is to ask our Discord community.

[Click here to join the CodebaseMentor Discord](https://discord.gg/7cAkUcKbjB).

## Want more challenges?

Sign up to [view more challenges](https://app.codebasementor.com/?utm_source=github&utm_medium=javascript-photo-gallery&utm_campaign=github_readmes) and [join our Discord](https://discord.gg/6VsSMZaM7q) to get notified when new challenges are released.
