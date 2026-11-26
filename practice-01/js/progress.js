"use strict";

const totalTasks = 5;
const completedTasks = 6;

const isValid =
  Number.isInteger(totalTasks) &&
  Number.isInteger(completedTasks) &&
  totalTasks >= 0 && totalTasks <= 1000 &&
  completedTasks >= 0 && completedTasks <= totalTasks;

if (!isValid) {
  console.log("Ошибка: недопустимые входные данные");
} else if (totalTasks === 0) {
  console.log("Задач пока нет");
} else {
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