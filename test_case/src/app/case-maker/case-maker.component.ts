import { Component } from '@angular/core';
import { Step } from '../interface-step';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// https://blog.angular-university.io/angular-custom-validators/

import { saveAs } from 'file-saver';
import mustache from 'mustache';
import {
  ContentChange,
  EditorChangeContent,
  EditorChangeSelection,
} from 'ngx-quill';
import { NgPlural } from '@angular/common';
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
  task: string = '';
  name = '';
  final_expected = '';
  final_expected_text = '';
  myForm!: FormGroup;

  _togglePrepare = true;
  _toggleSteps = true;

  _toggleNewPrepare = false;
  _toggleNewSteps = false;
  _toggleEditExpect = true;
  _toggleEditNewExpect = false;

  steps: Step[] = [];

  togglePrepare() {
    console.log('togglePrepare');
    this._togglePrepare = !this._togglePrepare;
  }

  toggleSteps() {
    console.log('toggleSteps');
    this._toggleSteps = !this._toggleSteps;
  }

  toogleNewStep() {
    console.log('_toggleNewSteps');
    this._toggleNewSteps = !this._toggleNewSteps;
  }

  toogleNewPrepare() {
    console.log('_toggleNewPrepare');
    this._toggleNewPrepare = !this._toggleNewPrepare;
  }

  toggleEditExpect() {
    console.log('_toggleEditExpect');
    this._toggleEditExpect = !this._toggleEditExpect;
  }

  toogleNewExpect() {
    console.log('toogleNewExpect');
    this._toggleEditNewExpect = !this._toggleEditNewExpect;
    this.editorContent = this.final_expected;
  }

  prepare_steps: Step[] = [];

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

    this.form = new FormGroup({
      text: new FormControl('<p><strong>Hello</strong></p>'),
    });

    this.form.valueChanges.subscribe((data) => {
      console.log('Changed Values', data);
    });
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

  inputFinalExpecteHandler(event: any) {
    console.log(event);
    this.final_expected = event.target.value;
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
    console.log('onDeletEvent');

    for (let i = 0; i < this.prepare_steps.length; i++) {
      let step = this.prepare_steps[i];
      if (step.id == id) {
        this.prepare_steps.splice(i, 1);
        break;
      }
    }
  }

  onDeletStepEvent(id: number) {
    console.log('onDeletStepEvent');

    for (let i = 0; i < this.steps.length; i++) {
      let step = this.steps[i];
      if (step.id == id) {
        this.steps.splice(i, 1);
        break;
      }
    }
  }

  save(): void {
    console.log(this.editorContent);

    var text = this.parseHtmlToMarkdown(this.final_expected);
    this.final_expected_text = text;
    const output = mustache.render(
      '# {{name}}\r\n' +
        '## Продукт: {{ product }} \r\n' +
        '## Компонент: {{ component }}\r\n' +
        '## Приоритет: {{ priority }}\r\n' +
        '## Задача: [{{{ task }}}]({{{ task }}})\r\n' +
        '## Ожидаемый результат:\r\n {{{ final_expected_text }}}\r\n',

      this
    );

    let file = new File([output], `test_case_${this.name}.md`, {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(file);
  }

  form!: FormGroup;
  html!: string;
  editorContent = ``;
  public blur(): void {
    console.log('blur');
  }

  public onSelectionChanged(): void {
    console.log('onSelectionChanged');
  }

  public onContentChanged(data: ContentChange): void {
    console.log('onSelectionChanged');
    console.log(data);
  }

  public saveExpected(): void {
    this.final_expected = this.editorContent;
    if (this.final_expected == undefined) this.final_expected = '';
    this._toggleEditNewExpect = false;
  }
  public cancelExpected(): void {
    console.log('cancelExpected');
    this._toggleEditNewExpect = false;
    this.editorContent = '';
  }

  public changedEditor(
    event: EditorChangeContent | EditorChangeSelection
  ): void {
    console.log('editor-change', event);
  }

  private parseHtmlToMarkdown(html: string): string {
    if (!html) {
      return '';
    }

    let markdown = html;

    markdown = markdown.replace(/<h1>/g, '# ').replace(/<\/h1>/g, '');
    markdown = markdown.replace(/<h2>/g, '## ').replace(/<\/h1>/g, '');
    markdown = markdown.replace(/<h3>/g, '### ').replace(/<\/h1>/g, '');
    markdown = markdown.replace(/<h4>/g, '#### ').replace(/<\/h1>/g, '');
    markdown = this.parseAll(markdown, 'strong', '**');
    markdown = this.parseAll(markdown, 'em', '*');
    markdown = this.parseAll(markdown, 's', '~~');
    markdown = markdown.replace(/<p><br><\/p>/g, '\n');
    markdown = markdown.replace(/<p>/g, '').replace(/<\/p>/g, '  \n');
    markdown = markdown
      .replace(/<blockquote>/g, '> ')
      .replace(/<\/blockquote>/g, '');

    markdown = this.parseList(markdown, 'ol', '1.');
    markdown = this.parseList(markdown, 'ul', '-');

    // todo: Umbrüche optimieren
    // todo: alle überflüssigen tags rausschmeißen
    // todo: links parsen
    // const allATags = markdown.match(/<a.+?<\/a>/g) || [];

    console.log(markdown);
    return markdown;
  }

  private parseAll(html: string, htmlTag: string, markdownEquivalent: string) {
    const regEx = new RegExp(`<\/?${htmlTag}>`, 'g');
    return html.replace(regEx, markdownEquivalent);
  }

  private htmlToElements(html: RegExpMatchArray | null) {
    var template = document.createElement('template');
    if (html) template.innerHTML = html.toString();
    return template.content.childNodes;
  }

  private parseList(
    html: string,
    listType: 'ol' | 'ul',
    identifier: string
  ): string {
    let parsedHtml = html;

    const getNextListRegEx = new RegExp(`<${listType}>.+?<\/${listType}>`);

    while (parsedHtml.match(getNextListRegEx) !== null) {
      const matchedList = parsedHtml.match(getNextListRegEx);

      console.log('matchedList', matchedList);

      const elements = this.htmlToElements(matchedList);
      const listItems: Array<string> = [];

      elements[0].childNodes.forEach((listItem) => {
        let parsedListItem = `${identifier} ${listItem.textContent}`;

        // get level of item to add spaces
        // @ts-ignore
        const className = listItem.className;
        if (className) {
          const splittedClassName = className.split('-');
          const numberOfLevel = parseInt(
            splittedClassName[splittedClassName.length - 1] || 0
          );

          for (let i = 0; i < numberOfLevel; i++) {
            parsedListItem = `   ${parsedListItem}`;
          }
        }

        listItems.push(parsedListItem);
      });

      parsedHtml = parsedHtml.replace(
        getNextListRegEx,
        listItems.join('\n') + '\n\n'
      );

      console.log('after parsing one list => ', parsedHtml);
    }

    return parsedHtml;
  }
}
