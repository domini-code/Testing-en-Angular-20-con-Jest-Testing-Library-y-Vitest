import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user',
  imports: [],
  template: `<p>User works!</p>`,
})
export class UserComponent {
  private readonly _userService = inject(UserService);

  getUserName() {
    return this._userService.getUser().name;
  }
}
