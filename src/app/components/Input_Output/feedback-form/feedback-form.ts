import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback-form.html',
})
export class FeedbackForm implements OnInit {
  @Input() shirtSizes: string[] = [];
  @Output() submitForm = new EventEmitter<unknown>();

  form!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
  }

  submit(): void {
    const formValue = this.form.value;
    this.submitForm.emit(formValue);
  }

  buildForm(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      shirtSize: ['', [Validators.required]],
    });
  }
}
