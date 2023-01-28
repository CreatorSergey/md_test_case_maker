import Mustache = require("mustache");
import fs = require("fs");
import express from "express";

/**
 * Инстансы
 */
const app = express();

/**
 * Константы
 */
const temp_folder: string = "./temp";
const port: number = 3000;

/**
 * Подготовка папки
 * @param folder - папка
 */
function prepare_folder(folder: string): void {
  try {
    fs.mkdirSync(folder);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Тест кейс
 */
interface ITestCase {
  id: number;
  title: string;
  author: string;
}

/**
 * Экземпляр кейса
 */
let test_case: ITestCase = {
  id: 1,
  title: "Создание проекта",
  author: "Jonh Smith",
};

/**
 * Сохранить файл
 */
function save_file(test_case: ITestCase, path: string): string {
  const output = Mustache.render("# {{title}}\r\n" + "## {{author}}", test_case);

  console.log(output);

  fs.writeFileSync(path, output);
  return output;
}

/**
 * Связывание
 */
app.get("/save_file", (request, result) => {
  prepare_folder(temp_folder);
  let text = save_file(test_case, temp_folder + "/" + test_case.id + ".md");
  result.send(text);
});

/**
 * Запуск
 */
app.listen(port, () => {
  console.log(`Серер запущен, порт ${port}`);
});
