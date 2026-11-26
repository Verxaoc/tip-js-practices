"use strict";

import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
  getTaskStats,
  getPendingTasks,
  getTaskTitles,
  findTaskById,
} from "./task-service.js";

function printStats(tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

function apply(currentTasks, result) {
  if (result.ok) {
    return result.tasks;
  }
  console.error(`Ошибка: ${result.error}`);
  return currentTasks;
}

// ===== Общий сценарий =====
console.log("\n===== Общий сценарий =====");
let current = demoTasks;
console.log("Названия:", getTaskTitles(current));
console.log("Невыполненные id:", getPendingTasks(current).map((t) => t.id));
printStats(current);

current = apply(current, addTask(current, 20, "Добавить проверку", "high"));
printStats(current);

current = apply(current, setTaskCompleted(current, 4, true));
printStats(current);

current = apply(current, renameTask(current, 10, "Подготовить инструкцию запуска"));
printStats(current);

current = apply(current, removeTask(current, 7));
printStats(current);

console.log("Итоговые id:", current.map((t) => t.id));
console.log("Невыполненная id:", getPendingTasks(current).map((t) => t.id));

// показать отказ
const repeated = addTask(current, 20, "Повтор", "low");
console.log("Повторное добавление id 20:", repeated);
console.log("demoTasks не изменился:", demoTasks.map((t) => t.id));

// ===== Индивидуальный вариант =====
console.log(`\n===== Вариант ${variantNumber} =====`);
let variantCurrent = variantTasks;
printStats(variantCurrent);

variantCurrent = apply(variantCurrent, addTask(variantCurrent, 80, "Проверить вёрстку портфолио", "low"));
printStats(variantCurrent);

variantCurrent = apply(variantCurrent, setTaskCompleted(variantCurrent, 11, true));
printStats(variantCurrent);

variantCurrent = apply(variantCurrent, renameTask(variantCurrent, 23, "Подготовить структуру и навигацию"));
printStats(variantCurrent);

variantCurrent = apply(variantCurrent, removeTask(variantCurrent, 37));
printStats(variantCurrent);

const duplicate = addTask(variantCurrent, 80, "Дубликат", "low");
console.log("Повторное добавление id 80:", duplicate);
console.log("variantTasks не изменился:", variantTasks.map((t) => t.id));

import { getPrioritySummary } from "./task-extra.js";
console.log("Сводка по приоритетам:", getPrioritySummary(demoTasks));