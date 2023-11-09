import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  forgottenPassword: FormGroup;

  constructor(
    public fb: FormBuilder
  ) { 
    this.forgottenPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      membershipId: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(4),
        Validators.pattern('^[0-9]{3}' + '[A-Z]')
      ]],
    });
  }

  ngOnInit(): void {
  }

  matcher = new MyErrorStateMatcher();
  
  saveData(){
    console.log(this.forgottenPassword.value);
  }

}
