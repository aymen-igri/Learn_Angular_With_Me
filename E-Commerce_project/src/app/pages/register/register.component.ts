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
import { AuthService } from '../../core/services/auth.service';
import { IRegister } from '../../core/interfaces/iregister';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IRegisterStatus } from '../../core/interfaces/iregister-status';
import { Router } from '@angular/router'

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
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(
    private _authService: AuthService,
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
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.passwordMatchValidation(this.password),
    ]);
  }

  initFormGroup(): void {
    this.registrationForm = new FormGroup({
      username: this.username,
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

  register(submitedData: IRegister): void {
    this._authService.doCreate(submitedData).subscribe({
      next: (r) => {
        if(r.id){
          this.showNotif({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful!',
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
        this.router.navigate(['login'])
      },
    });
  }

  showNotif(status: IRegisterStatus): void {
    this.messageService.add(status);
  }

  submit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      this.register(this.registrationForm.value);
      
    } else {
      console.log('Form not valid');
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((c) =>
        this.registrationForm.controls[c].markAsDirty()
      );
    }
  }
}
