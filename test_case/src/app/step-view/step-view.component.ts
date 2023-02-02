import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Step } from '../interface-step';

@Component({
  selector: 'app-step-view',
  templateUrl: './step-view.component.html',
  styleUrls: ['./step-view.component.scss']
})
export class StepViewComponent implements OnInit {
  @Input() step!: Step;
  @Input() index!: number;
  @Output() deleteEvent = new EventEmitter<number>();
  
  ngOnInit() {

  }

  callParent(): void {
    console.log("callParent");
    this.deleteEvent.emit(this.index);
  }
}
