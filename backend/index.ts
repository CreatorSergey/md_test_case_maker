import Mustache = require('mustache');
import fs = require('fs');

interface ITestCase {
  id: number
  title: string,
  author: string
}

let test_case: ITestCase = {
  id: 1,
  title: 'Создание проекта',
  author: 'Jonh Smith'
}

const output = Mustache.render(
  "# {{title}}\r\n" +
  "## {{author}}", test_case);

console.log(output);

const temp_folder: string = './temp';

try {
  fs.mkdirSync(temp_folder);
}
catch (e) {
  console.log(e);
}

fs.writeFileSync(temp_folder + '/' + test_case.id + ".md  ", output);