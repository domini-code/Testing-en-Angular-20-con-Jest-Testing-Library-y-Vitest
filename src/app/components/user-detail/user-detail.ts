import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [],
  template: `<p>User ID: {{ userId }}</p>`,
})
export class UserDetail {
  public userId: string;
  private readonly _route = inject(ActivatedRoute);

  constructor() {
    this.userId = this._route.snapshot.paramMap.get('userId')!;
  }
}
