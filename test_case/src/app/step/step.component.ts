import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit  {
 _step_index: number = 0;

  @Input()
  set step_index(param:number) {   // this is setter for booleanCheck input.
    this._step_index = param;
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this._step_index);
  }

}
