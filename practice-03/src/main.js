"use strict";

import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
  findTaskById,
  setTaskCompleted,
  removeTask,
} from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import {
  renderTaskList,
  renderSummary,
  renderEmptyState,
} from "./task-view.js";

const params = new URLSearchParams(location.search);
const initialTasks = params.get("dataset") === "variant" ? variantTasks : demoTasks;

let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";

const listElement = document.querySelector("#task-list");
const summaryElement = document.querySelector("#task-summary");
const emptyElement = document.querySelector("#empty-state");
const messageElement = document.querySelector("#operation-message");
const filterButtons = document.querySelectorAll("#task-filters button");

function restoreTaskFocus(id, action) {
  const card = listElement.querySelector(`li[data-task-id="${id}"]`);
  const target = card
    ? card.querySelector(`button[data-action="${action}"]`)
    : document.querySelector("#task-filters button.is-active");
  if (target) target.focus();
}

export function renderApp() {
  const visible = getVisibleTasks(currentTasks, currentFilter);
  renderTaskList(listElement, visible);
  renderSummary(summaryElement, currentTasks, visible.length);
  renderEmptyState(emptyElement, currentTasks.length, visible.length);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function clearMessage() {
  if (messageElement) messageElement.textContent = "";
}

function showMessage(text) {
  if (messageElement) messageElement.textContent = text;
}

export function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const id = Number(card.dataset.taskId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    showMessage("Некорректный идентификатор задачи");
    return;
  }

  if (!findTaskById(currentTasks, id)) {
    showMessage("Задача не найдена");
    return;
  }

  const result =
    action === "toggle"
      ? setTaskCompleted(
          currentTasks,
          id,
          !findTaskById(currentTasks, id).completed
        )
      : removeTask(currentTasks, id);

  if (!result.ok) {
    showMessage(result.error);
    return;
  }

  currentTasks = result.tasks;
  clearMessage();
  renderApp();
  restoreTaskFocus(id, action);
}

export function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  const filter = button.dataset.filter;
  if (!["all", "pending", "completed"].includes(filter)) return;

  currentFilter = filter;
  clearMessage();
  renderApp();
}

listElement.addEventListener("click", handleTaskListClick);
filterButtons.forEach((button) =>
  button.addEventListener("click", handleFilterClick)
);

renderApp();

console.log("Вариант:", variantNumber);