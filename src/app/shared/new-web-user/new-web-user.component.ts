import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {matchValidator} from './confirm-password.validator';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-web-user',
  templateUrl: './new-web-user.component.html',
  styleUrls: ['./new-web-user.component.scss']
})
export class NewWebUserComponent implements OnInit {

  createUserForm: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      membershipId: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(4),
        Validators.pattern('^[0-9]{3}' + '[A-Z]')
      ]],
      password1: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$'), 
        matchValidator('password2', true)]],
      password2: ['', [
        Validators.required,
        Validators.minLength(6), 
        Validators.maxLength(10),  
        matchValidator('password1')]]
    });
  }
  ngOnInit() { }

  matcher = new MyErrorStateMatcher();

  saveData(){
    console.log(this.createUserForm.value);
  }
}