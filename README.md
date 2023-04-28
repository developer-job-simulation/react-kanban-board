[![banner](https://user-images.githubusercontent.com/2349518/235016177-e315b43d-5007-4025-84c4-03b0d849c5a4.svg)](https://codebasementor.com?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes)

# React Kanban Board by [CodebaseMentor](https://www.codebasementor.com?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes)

![Discord](https://img.shields.io/discord/968893691769000027?color=7289da&label=Discord&logo=discord&logoColor=white&style=for-the-badge)

This is an advanced project in React that allows you to create a dynamic and interactive Kanban board. However, it currently has several issues that need to be resolved:

1. The tasks aren't fetched from the server.
2. The application doesn't handle the onDragStart, onDragOver, onDrop, and onDragEnd events.
   1. Implement handleTaskDragStart, handleTaskDragOver, handleTaskDrop, and handleTaskDragEnd to handle the drag-and-drop events.
   2. Make sure the application doesn't incorrectly show duplicate tasks when dragged over themselves.
   3. Make sure the application doesn't leave a lingering task when dragged over a column but dropped elsewhere.
   4. Make sure the application doesn't delete a task that is dragged over it's current column.
3. Task changes aren't being sent to the server.

## Learning Objectives

You will learn and gain experience with:

- Implementing drag-and-drop functionality in React by handling various drag events, such as drag start, drag over, and drop.
- Managing application state during drag-and-drop operations to ensure consistent behavior.
- Updating data on the server after making client-side changes.
- Properly resetting application state after each drag-and-drop operation to ensure the UI behaves correctly.

## How to start working

1. Fork this repo and clone it locally.
1. Install the dependencies by running npm i
1. Run the app locally by running `npm run dev:client` to start the frontend, and `npm run dev:server` to start the backend.
1. Open `localhost:3000` in your browser to see the current state of the project.
1. Fix all the issues (hints are provided as TODO comments in the code)
1. Once all your solutions are complete, create a single Pull Request to this repository
1. Check if your solutions passes our automated tests. You need to create an account on [CodebaseMentor](https://www.codebasementor.com?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes) to do this.

## Need help?

The best way to ask for help is to ask our Discord community.

[Click here to join the CodebaseMentor Discord](https://discord.gg/7cAkUcKbjB).

## Want more challenges?

Sign up to [view more challenges](https://app.codebasementor.com/?utm_source=github&utm_medium=react-kanban-board&utm_campaign=github_readmes) and [join our Discord](https://discord.gg/6VsSMZaM7q) to get notified when new challenges are released.
