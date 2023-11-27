import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SelectService } from '../../services/select.service';
import { Installation } from '../../models/installation';
import { InstallationType } from '../../models/installation-type';
import { ReservationHour } from '../../models/reservation-hours';

import { ActivatedRoute, Params } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.scss']
})
export class NewReserveComponent implements OnInit{

  selectedInstallationType: InstallationType = new InstallationType(1, 'Tenis');
  installationTypes: InstallationType[];
  installations: Installation[];
  hoursForReservation: ReservationHour[];
  
  todayDate:Date = new Date();
  maxDate:Date = new Date(new Date().setDate(new Date().getDate() + 6));

  newReserveForm: FormGroup;
  
  constructor(public fb: FormBuilder, private selectService: SelectService, private rutaActiva: ActivatedRoute) {
    this.newReserveForm = this.fb.group({
      date: [this.todayDate, [Validators.required]],
      initTime: ['', [Validators.required]],
      light:['', [Validators.required]],
      paid:['', [Validators.required]],
      installationType:['', [Validators.required]],
      installation:['', [Validators.required]]
    });
    this.installationTypes = this.selectService.getInstallationTypes();
    this.hoursForReservation = this.selectService.getHoursForReservation();
  }
  ngOnInit( ) {
    let id = this.rutaActiva.snapshot.paramMap.get('id'); // id del usuario de la reserva
   } 

  onSelect(installationTypeIdEvent: Event) {
    const target = installationTypeIdEvent.target as HTMLSelectElement;
   // this.installations = this.selectService.getInstallations().filter((item) => item.installationTypeId == parseInt(target.value));
  }
  matcher = new MyErrorStateMatcher();

  saveData(){
    console.log(this.newReserveForm.value);
    const nombre: string = this.newReserveForm.controls["installationType"].value as string;
    const apellido: string = this.newReserveForm.controls["apellido"].value as string;
    const correo: string = this.newReserveForm.controls["correo"].value as string;
    const fecha: string = this.newReserveForm.controls["fecha"].value as string;
    const hora: string = this.newReserveForm.controls["hora"].value as string;

    if(this.newReserveForm.valid){
      
    }
  }

}
