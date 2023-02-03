import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Step } from '../interface-step';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit  {
 _step_index: number = 0;
 @Output() someEvent = new EventEmitter<Step>();

 new_step: Step  = {
  text: "",
  expected: "",
  id: 0
 };

 inputTextHandler(event: any) {
  console.log(event);
  this.new_step.text = event.target.value;
}

inputExpectedHandler(event: any) {
  console.log(event);
  this.new_step.expected = event.target.value;
}

  @Input()
  set step_index(param:number) {   // this is setter for booleanCheck input.
    this._step_index = param;
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this._step_index);
  }

  callParent(): void {
    const current = new Date();
    const timestamp = current.getTime();

    this.someEvent.emit({text: this.new_step.text, expected: this.new_step.expected, id: timestamp});
    console.log("callParent")
    this.new_step.text = "";
    this.new_step.expected = "";
  }
}
