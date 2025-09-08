import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(private _authService: AuthService) {
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.passwordMatchValidation(this.password),
    ]);
  }

  initFormGroup(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  passwordMatchValidation(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value) {
        console.log('No Match');
        return { noMatch: true };
      } else {
        return null;
      }
    };
  }

  submit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      this._authService
        .doCreate({
          id: 0,
          username: this.registrationForm.value.name,
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password,
        })
        .subscribe({
          next: (r) => {
            console.log('succes , ', r);
          },
          error: (e) => {
            console.log('faild, error: ', e);
          },
          complete: () => {
            console.log('mission completed');
          },
        });
    } else {
      console.log('Form not valid');
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((c) =>
        this.registrationForm.controls[c].markAsDirty()
      );
    }
  }
}
