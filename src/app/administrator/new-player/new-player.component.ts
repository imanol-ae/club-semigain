import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

    newPlayerForm: FormGroup;
    todayDate:Date = new Date();
  
    constructor(
      public fb: FormBuilder
    ) {
      this.newPlayerForm = this.fb.group({
        name: ['', [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(30)
        ]],
        surname: ['', [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(40)
        ]],
        direction: ['', [
          Validators.minLength(2), 
          Validators.maxLength(60)
        ]],
        municipality: ['', [
          Validators.minLength(2), 
          Validators.maxLength(30)
        ]],
        province: ['', [
          Validators.minLength(2), 
          Validators.maxLength(30)
        ]],
        email: ['', [Validators.required, Validators.email]],
        membershipId: ['', [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(4),
          Validators.pattern('^[0-9]{3}' + '[A-Z]')
        ]],
        date: [this.todayDate, [Validators.required]],
        birthdate: ['', [Validators.required]],
      });
    }
    ngOnInit() { }
  
    matcher = new MyErrorStateMatcher();
  
    saveData(){
      console.log(this.newPlayerForm.value);
    }
  }
