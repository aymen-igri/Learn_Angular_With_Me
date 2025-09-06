import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(){
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls(): void{
    this.name = new FormControl('',[Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('',[Validators.required, Validators.email]);
    this.password = new FormControl('',[Validators.required]);
    this.confirmPassword = new FormControl('',[Validators.required,this.passwordMatchValidation]);
  }

  initFormGroup(): void{
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  passwordMatchValidation(pass:AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | {[key: string] : boolean} => {
      if (pass.value !== rePass.value){
        return { noMatch: true};
      }else{
        return null;
      }
    }
  }

}
