import fetch from "node-fetch";
import { chromium } from "playwright";
import { setTimeout } from "timers/promises";
import { test } from "uvu";
import * as assert from "uvu/assert";

let browser;
let context;
let page;

const initialState = {
  Backlog: [
    {
      id: "task5",
      name: "Deploy application",
    },
  ],
  "In Progress": [
    {
      id: "task4",
      name: "Test application",
    },
  ],
  "In Review": [
    {
      id: "task6",
      name: "Build Application",
    },
  ],
  Done: [
    {
      id: "task2",
      name: "Design mockups",
    },
    {
      id: "task1",
      name: "Write specs",
    },
  ],
};

test.before(async () => {
  browser = await chromium.launch({
    use: { timezoneId: "Etc/UTC" },
  });
  context = await browser.newContext({});
});

test.before.each(async () => {
  page = await context.newPage();
  await fetch("http://localhost:3001/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initialState),
  });
});

test.after.each(async () => {
  await page.evaluate(() => window.localStorage.clear());
  await page.close();
});

test.after(async () => {
  await browser.close();
  await context.close();
});

test("Solved Issue #1: The tasks aren't fetched from the server.", async () => {
  await page.goto("http://localhost:3000");
  await setTimeout(1000);

  const tasks = await page.$$eval("li", (tasks) => tasks.map((task) => task.textContent));
  const expectedTasks = [
    "Deploy application",
    "Test application",
    "Build Application",
    "Design mockups",
    "Write specs",
  ];

  tasks.sort();
  expectedTasks.sort();
  assert.equal(tasks, expectedTasks, "Tasks fetched from server do not match the expected tasks");
});

test("Solved Issue #2: The application doesn't handle the onDragStart, onDragOver, onDrop, and onDragEnd events.", async () => {
  await page.goto("http://localhost:3000");
  await setTimeout(1000);

  const taskToDrag = await page.$('li:has-text("Test application")');
  const dropTarget = await page.getByText("In Review");

  const taskToDragBoundingBox = await taskToDrag.boundingBox();
  const dropTargetBoundingBox = await dropTarget.boundingBox();

  await page.mouse.move(
    taskToDragBoundingBox.x + taskToDragBoundingBox.width / 2,
    taskToDragBoundingBox.y + taskToDragBoundingBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    dropTargetBoundingBox.x + dropTargetBoundingBox.width / 2,
    dropTargetBoundingBox.y + dropTargetBoundingBox.height / 2
  );

  await page.mouse.up();

  const tasks = await page.$$eval("li", (tasks) => tasks.map((task) => task.textContent));
  const expectedTasks = [
    "Deploy application",
    "Build Application",
    "Test application",
    "Design mockups",
    "Write specs",
  ];

  assert.equal(tasks, expectedTasks, "Tasks fetched from server do not match the expected tasks");
});

test("Solved Issue #3: Task changes aren't being sent to the server.", async () => {
  await page.goto("http://localhost:3000");
  await setTimeout(1000);

  // Drag card from "In Progress" to "In Review"
  const taskToDrag = await page.$('li:has-text("Test application")');
  const dropTarget = await page.getByText("In Review");

  const taskToDragBoundingBox = await taskToDrag.boundingBox();
  const dropTargetBoundingBox = await dropTarget.boundingBox();

  await page.mouse.move(
    taskToDragBoundingBox.x + taskToDragBoundingBox.width / 2,
    taskToDragBoundingBox.y + taskToDragBoundingBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    dropTargetBoundingBox.x + dropTargetBoundingBox.width / 2,
    dropTargetBoundingBox.y + dropTargetBoundingBox.height / 2
  );

  await page.mouse.up();

  // Refresh the page
  await page.reload();

  const inReviewTasks = await page.$eval('div:has-text("In Review")', (column) =>
    Array.from(column.querySelectorAll("li")).map((task) => task.textContent)
  );

  // Check if the changes were made on the client side
  assert.ok(inReviewTasks.includes("Test application"), "Task changes were not persisted on the client side");

  // Fetch the server state
  const serverState = await fetch("http://localhost:3001/tasks").then((response) => response.json());

  // Check if the changes were made on the server side
  const inReviewTasksServer = serverState["In Review"].map((task) => task.name);
  assert.ok(inReviewTasksServer.includes("Test application"), "Task changes were not persisted to the server");
});

test.run();
