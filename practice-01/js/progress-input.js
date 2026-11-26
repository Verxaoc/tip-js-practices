"use strict";

function parseCount(value, name) {
  if (typeof value !== "string") {
    return { ok: false, error: `${name}: ожидалась строка` };
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    return { ok: false, error: `${name}: пустой ввод` };
  }
  const number = Number(trimmed);
  if (!Number.isInteger(number)) {
    return { ok: false, error: `${name}: не целое число` };
  }
  return { ok: true, value: number };
}

function printProgress(totalInput, completedInput) {
  const total = parseCount(totalInput, "totalTasks");
  if (!total.ok) {
    console.log(`Ошибка: ${total.error}`);
    return;
  }
  const completed = parseCount(completedInput, "completedTasks");
  if (!completed.ok) {
    console.log(`Ошибка: ${completed.error}`);
    return;
  }

  const totalTasks = total.value;
  const completedTasks = completed.value;

  if (totalTasks < 0 || totalTasks > 1000) {
    console.log("Ошибка: totalTasks вне диапазона 0…1000");
    return;
  }
  if (completedTasks < 0 || completedTasks > totalTasks) {
    console.log("Ошибка: completedTasks вне диапазона 0…totalTasks");
    return;
  }
  if (totalTasks === 0) {
    console.log("Задач пока нет");
    return;
  }

  const remaining = totalTasks - completedTasks;
  const percent = (completedTasks / totalTasks * 100).toFixed(1);
  let status;
  if (completedTasks === 0) status = "Не начато";
  else if (completedTasks === totalTasks) status = "Завершено";
  else status = "В работе";

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remaining}`);
  console.log(`Прогресс: ${percent}%`);
  console.log(`Статус: ${status}`);
}

// --- Проверки ---
const cases = [
  ["12", "5"],           // обычные строки
  [" 12 ", " 5 "],       // пробелы по краям
  ["", "5"],             // пустая строка
  ["   ", "5"],          // строка из пробелов
  ["abc", "5"],          // не число
  ["12", "2.5"],         // дробное
  ["Infinity", "5"],     // бесконечность
  [null, "5"],           // null
  [undefined, "5"],      // undefined
  ["1001", "0"],         // верхняя граница
  ["0", "0"],            // задач нет
];

for (const [t, c] of cases) {
  console.log(`\n--- total=${String(t)}, completed=${String(c)} ---`);
  printProgress(t, c);
}