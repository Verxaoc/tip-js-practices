"use strict";

const totalTasks = 9;
const completedTasks = 9;
const dailyLimit = 3;

const tasksValid =
  Number.isInteger(totalTasks) &&
  Number.isInteger(completedTasks) &&
  totalTasks >= 0 && totalTasks <= 1000 &&
  completedTasks >= 0 && completedTasks <= totalTasks;

const limitValid =
  Number.isInteger(dailyLimit) && dailyLimit >= 1 && dailyLimit <= 1000;

if (!tasksValid || !limitValid) {
  console.log("Ошибка: недопустимые входные данные");
} else if (totalTasks === completedTasks) {
  console.log("Все задачи уже выполнены");
  console.log("Потребуется дней: 0");
} else {
  let remaining = totalTasks - completedTasks;
  let day = 0;
  console.log(`Осталось задач: ${remaining}`);
  while (remaining > 0) {
    day += 1;
    const doneToday = Math.min(dailyLimit, remaining);
    remaining -= doneToday;
    console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
  }
  console.log(`Потребуется дней: ${day}`);
}