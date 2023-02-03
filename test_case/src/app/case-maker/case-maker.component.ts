import { Component } from '@angular/core';
import { Step } from '../interface-step';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// https://blog.angular-university.io/angular-custom-validators/

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

  product: string = this.products[1];
  component: string = this.components[0];
  priority: string = this.priorities[1];
  name = '';
  myForm!: FormGroup;

  _togglePrepare = true
  _toggleSteps = true

  _toggleNewPrepare = false
  _toggleNewSteps = false

  steps: Step[] = [
  ]

  togglePrepare() {
    console.log("togglePrepare")
    this._togglePrepare = !this._togglePrepare;
  }

  toggleSteps() {
    console.log("toggleSteps")
    this._toggleSteps = !this._toggleSteps;
  }

  toogleNewStep() {
    console.log("_toggleNewSteps")
    this._toggleNewSteps = !this._toggleNewSteps;
  }

  toogleNewPrepare() {
    console.log("_toggleNewPrepare")
    this._toggleNewPrepare = !this._toggleNewPrepare;
  }

  prepare_steps: Step[] = [
  ]

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        name_field: this.fb.control(null),
      },
      {
        validators: this.checkValue(),
      }
    );
  }

  private checkValue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get('name_field')?.value;
      if (valueOfControlA == '' || valueOfControlA == undefined) {
        return { isEmpty: true };
      }

      let reg = new RegExp(/[^a-zа-я 0-9/\r\n]/gimu);
      if (reg.test(valueOfControlA) == true) return { isInvalid: true };
      return null;
    };
  }
  inputNameHandler(event: any) {
    console.log(event);
    this.name = event.target.value;
  }

  limitLines(event: Event, maxLines: number) {
    let textarea = event.target as any;
    let maxRows: number = maxLines;

    let newContent: string = (textarea.value as string)
      .split('\n')
      .filter((val, row) => row < maxRows)
      .join('\n');

    textarea.value = newContent;
    this.name = newContent;
  }

  getNotification(step: Step) {
    console.log(step);
    this.prepare_steps.push(step);
  }

  onCreateStep(step: Step) {
    console.log(step);
    this.steps.push(step);
  }

  onDeletEvent(id: number) {
    console.log("onDeletEvent");

    for(let i = 0; i < this.prepare_steps.length; i++) {
      let step = this.prepare_steps[i];
      if(step.id == id)
      {
        this.prepare_steps.splice(i, 1); 
        break;
      }
    }
  }

  onDeletStepEvent(id: number) {
    console.log("onDeletStepEvent");

    for(let i = 0; i < this.steps.length; i++) {
      let step = this.steps[i];
      if(step.id == id)
      {
        this.steps.splice(i, 1); 
        break;
      }
    } 
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
