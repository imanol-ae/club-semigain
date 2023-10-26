import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.scss']
})
export class NewReserveComponent {

  name = 'Nueva reserva';

  view: string = 'Instalaciones';
  tenis = [ '1', '2', '3', '4', '5', '6' ];
  fronton = [ '1', '2' ];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'b' : null,
      'one': null,
      'two' : null,
    });

    this.form.valueChanges.subscribe(value => {
      console.log(this.form)
      console.log(value)
      if(value.b === 'tenis') {
        this.form.controls['tenis'].setValidators(Validators.required)
        this.form.controls['fronton'].clearValidators()
        this.form.controls['fronton'].updateValueAndValidity({onlySelf:true})
      } else {
        this.form.controls['fronton'].setValidators(Validators.required)
        this.form.controls['tenis'].clearValidators()
        this.form.controls['tenis'].updateValueAndValidity({onlySelf:true})
      }
    })
  }

  test() {
    console.log(this.form)
  }

  setValidators(val: any) {
    let c = this.form.controls['tenis'];
    let d = this.form.controls['fronton'];

    if (val === 'tenis') {
      c.setValidators(Validators.required)
      d.setValidators(null)
    } else {      
      c.setValidators(null);
      d.setValidators(Validators.required)
    }
  }


}
