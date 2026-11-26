"use strict";

export function getVisibleTasks(tasks, filter = "all") {
  if (filter === "pending") return tasks.filter((t) => t.completed === false);
  if (filter === "completed") return tasks.filter((t) => t.completed === true);
  return [...tasks];
}