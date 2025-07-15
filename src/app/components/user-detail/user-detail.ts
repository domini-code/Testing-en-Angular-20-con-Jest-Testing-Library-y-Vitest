import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [],
  template: `<p>User ID: {{ userId() }}</p>`,
})
export class UserDetail {
  // public userId = '';
  // private readonly _route = inject(ActivatedRoute);
  readonly userId = input.required<string>();

  // constructor() {
  //   this.userId = this._route.snapshot.paramMap.get('userId')!;
  // }

  // ngOnInit(): void {
  //   this._route.params.subscribe((params) => {
  //     this.userId = params['userId'];
  //   });
  // }
}
