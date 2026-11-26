"use strict";

import { getTaskStats } from "./task-service.js";

const PRIORITY_LABELS = { low: "Низкий", medium: "Средний", high: "Высокий" };

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-card");
  li.dataset.taskId = String(task.id);
  if (task.completed) li.classList.add("is-completed");

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = task.title;

  const status = document.createElement("span");
  status.classList.add("task-status");
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("span");
  priority.classList.add("task-priority");
  priority.textContent = PRIORITY_LABELS[task.priority];

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.dataset.action = "toggle";
  toggle.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.classList.add("action-label");
  toggleLabel.textContent = "Выполнена";
  toggle.append(toggleLabel);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.dataset.action = "delete";
  const removeLabel = document.createElement("span");
  removeLabel.classList.add("action-label");
  removeLabel.textContent = "Удалить";
  remove.append(removeLabel);

  actions.append(toggle, remove);
  li.append(title, status, priority, actions);
  return li;
}

export function renderTaskList(listElement, tasks) {
  const cards = tasks.map((task) => createTaskElement(task));
  listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  summaryElement.querySelector('[data-stat="total"]').textContent = String(total);
  summaryElement.querySelector('[data-stat="completed"]').textContent = String(completed);
  summaryElement.querySelector('[data-stat="pending"]').textContent = String(pending);
  summaryElement.querySelector('[data-stat="progress"]').textContent = `${progress.toFixed(1)}%`;
  summaryElement.querySelector('[data-stat="visible"]').textContent = String(visibleCount);
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0 && visibleCount === 0) {
    messageElement.textContent = "Список задач пуст.";
    messageElement.hidden = false;
  } else if (total > 0 && visibleCount === 0) {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  } else {
    messageElement.textContent = "";
    messageElement.hidden = true;
  }
}