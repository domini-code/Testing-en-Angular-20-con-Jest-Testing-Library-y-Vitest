import { Component, input, output } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  template: `
    <button role="button" [type]="type()" (click)="onClick()">
      <ng-content />
    </button>
  `,
})
export class Button {
  type = input.required<ButtonType>();

  buttonClick = output<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}





