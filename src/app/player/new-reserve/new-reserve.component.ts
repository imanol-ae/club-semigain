import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { SelectService } from '../../services/select.service';
import { Installation } from '../../models/installation';
import { InstallationType } from '../../models/installation-type';
import { ReservationHour } from '../../models/reservation-hours';

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
  
  constructor(public fb: FormBuilder, private selectService: SelectService) {
    this.newReserveForm = this.fb.group({
      date: [this.todayDate, [Validators.required]],
      initTime: ['', [
        Validators.required
        //Validators.minLength(5), 
        //Validators.maxLength(5),
        //Validators.pattern('^[0-2][0-9]:[0][0]$')
      ]],
      light:['', [Validators.required]],
      paid:['', [Validators.required]],
      installationType:['', [Validators.required]],
      installation:['', [Validators.required]]
    });
    this.installationTypes = this.selectService.getInstallationTypes();
    this.hoursForReservation = this.selectService.getHoursForReservation();
    //this.onSelect(this.selectedInstallationType.installationTypeId);

  }
  ngOnInit( ) { } 

  onSelect(installationTypeIdEvent: Event) {
    const target = installationTypeIdEvent.target as HTMLSelectElement;
    this.installations = this.selectService.getInstallations().filter((item) => item.installationTypeId == parseInt(target.value));
  }
  matcher = new MyErrorStateMatcher();

  saveData(){
    console.log(this.newReserveForm.value);
  }

}
