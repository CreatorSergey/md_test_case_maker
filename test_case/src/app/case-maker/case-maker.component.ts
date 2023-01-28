import { Component } from '@angular/core';

import { saveAs } from 'file-saver';
import mustache from 'mustache';

@Component({
  selector: 'app-case-maker',
  templateUrl: './case-maker.component.html',
  styleUrls: ['./case-maker.component.scss'],
})
export class CaseMakerComponent {
  products: string[] = ['None', 'Bus77', 'i3 Pro', 'i3 Knx'];
  components: string[] = ['None', 'Редактор комнат', 'Welcome'];
  priorities: string[] = ['Низкий', 'Обычный', 'Важный'];

  product: string = this.products[0];
  component: string = this.components[0];
  priority: string = this.priorities[0];
  name = '';

  inputNameHandler(event: any) {
    console.log(event);
    this.name = event.target.value;
  }

  save(): void {
    const output = mustache.render(
      '# {{name}}\r\n' +
        '## Продукт: {{ product }} \r\n' +
        '## Компонент: {{component}}\r\n' +
        '## Приоритет: {{priority}}\r\n',
      this
    );

    let file = new File([output], `test_case_${this.name}.md`, {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(file);
  }
}
