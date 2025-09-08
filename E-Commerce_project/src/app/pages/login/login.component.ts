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
import { LoginService } from '../../core/services/login.service';
import { ILogin } from '../../core/interfaces/ilogin';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IRegisterStatus } from '../../core/interfaces/iregister-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  username!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.password = new FormControl('', [Validators.required]);
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
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

  login(submitedData: ILogin): void {
    this._loginService.doGet(submitedData).subscribe({
      next: (r) => {
        if (r.token) {
          console.log(r);
          this.showNotif({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful!',
          });
        }
      },
      error: (e) => {
        this.showNotif({
          severity: 'error',
          summary: 'Error',
          detail: e.error.error,
        });
      },
      complete: () => {
        this.router.navigateByUrl('/user');
      },
    });
  }

  showNotif(status: IRegisterStatus): void {
    this.messageService.add(status);
  }

  submit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      this.login(this.loginForm.value);
    } else {
      console.log('Form not valid');
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((c) =>
        this.loginForm.controls[c].markAsDirty()
      );
    }
  }
}
