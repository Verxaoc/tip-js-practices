"use strict";

function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function normalizeTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const normalized = title.trim();
  if (normalized.length < 1 || normalized.length > 100) {
    return { ok: false, error: "Название должно быть длиной от 1 до 100 символов" };
  }
  return { ok: true, title: normalized };
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const normalized = normalizeTitle(title);
  if (!normalized.ok) return normalized;
  if (!["low", "medium", "high"].includes(priority)) {
    return { ok: false, error: "Приоритет должен быть low, medium или high" };
  }
  return {
    ok: true,
    task: {
      id,
      title: normalized.title,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  const created = createTask(id, title, priority);
  if (!created.ok) return created;
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть true или false" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    ),
  };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const normalized = normalizeTitle(title);
  if (!normalized.ok) return normalized;
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, title: normalized.title } : task
    ),
  };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}