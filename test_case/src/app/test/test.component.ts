import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div class="card">
      <h2>Test Component</h2>
    </div>
  `,
  styles: [
    `
    .card {
      padding: .5rem 1rem;
      border: 1px dashed #ccc;
      margin-bottom: 1rem;

      h2 {
        margin-bottom: .5rem;
      }
    }
    `
  ]
})
export class TestComponent {

}
