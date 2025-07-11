import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  template: `<button (click)="onLoginSuccess()">Login</button>`,
})
export class Login {
  private readonly _router = inject(Router);

  onLoginSuccess(): void {
    this._router.navigate(['/home']);
  }
}
