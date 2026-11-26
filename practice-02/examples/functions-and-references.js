"use strict";

// Эксперимент 1: sum с числами и со строкой
function sum(a, b) {
  return a + b;
}
console.log("1) sum(2, 3) =", sum(2, 3));
console.log("1) sum(\"2\", 3) =", sum("2", 3));

// Эксперимент 2: стрелочная функция с телом в скобках (был пропущен return)
const squareBroken = (value) => {
  value * value;
};
console.log("2) squareBroken(4) =", squareBroken(4));

const square = (value) => {
  return value * value;
};
console.log("2) square(4) =", square(4));

// Эксперимент 3: присваивание объекта второй переменной
const original = { title: "Черновик", published: false };
const alias = original;
alias.published = true;
console.log("3) original.published =", original.published);
console.log("3) original === alias =", original === alias);

// Эксперимент 4: копирование массива объектов через spread
const items = [{ id: 1, done: false }];
const copy = [...items];
copy[0].done = true;
console.log("4) items[0].done =", items[0].done);
console.log("4) items === copy =", items === copy);
console.log("4) items[0] === copy[0] =", items[0] === copy[0]);

// Эксперимент 5: spread объекта и повторное указание свойства
const oldBook = { id: 12, title: "Черновик", available: false };
const newBook = { ...oldBook, available: true };
const wrongOrder = { available: true, ...oldBook };
console.log("5) newBook.available =", newBook.available);
console.log("5) wrongOrder.available =", wrongOrder.available);
console.log("5) oldBook.available =", oldBook.available);

// Эксперимент 6: параметр по умолчанию
function makeCaption(text = "Без названия") {
  return text;
}
console.log("6) makeCaption() =", makeCaption());
console.log("6) makeCaption(undefined) =", makeCaption(undefined));
console.log("6) makeCaption(null) =", makeCaption(null));
console.log("6) makeCaption(\"\") =", makeCaption(""));