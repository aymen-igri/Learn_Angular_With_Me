import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { ILogin } from '../../core/interfaces/ilogin';
import { MessageService } from 'primeng/api';
import { IRegisterStatus } from '../../core/interfaces/iregister-status';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { mainUser } from '../../shared/mainUser/mainUser';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _loginService: LoginService,
    private _userDataService: UserDataService,
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
  
  login(submitedData: ILogin): void {
    this._loginService.doLog(submitedData).subscribe({
      next: (r) => {
        if (r.token) {
          console.log(r);
          this.showNotif({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful!',
          });
          localStorage.setItem('userToken', r.token);
          this._userDataService.doGetUser(r.token).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
          this.router.navigateByUrl('/home');
        }
      },
      error: (e) => {
        console.log(e);
        this.showNotif({
          severity: 'error',
          summary: 'Error',
          detail: e.error,
        });
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
