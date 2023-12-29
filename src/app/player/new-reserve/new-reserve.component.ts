import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SelectService } from '../../services/select.service';
import { Installation } from '../../models/installation';
import { InstallationType } from '../../models/installation-type';
import { ReservationHour } from '../../models/reservation-hours';
import { ActivatedRoute, Params } from '@angular/router';
import { ReservationModel } from 'src/app/models/reservation-model';
import { NewReserve } from 'src/app/models/new-reserve';

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
export class NewReserveComponent implements OnInit {

  selectedInstallationType: InstallationType = new InstallationType(1, 'Tenis');
  installationTypes: InstallationType[];
  installations: Installation[];
  hoursForReservation: ReservationHour[];
  installationTypeTarget: string;
  installationTarget: string;
  todayDate: Date = new Date();
  maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 6));
  userId: any;
  usuario: any;
  nombre: string;
  apellidos: string;
  newReserva: NewReserve;
  newReserveForm: FormGroup;

  constructor(public fb: FormBuilder, private selectService: SelectService, private rutaActiva: ActivatedRoute) {
    this.newReserveForm = this.fb.group({
      date: [this.todayDate, [Validators.required]],
      initTime: ['', [Validators.required]],
      light: ['', [Validators.required]],
      paid: ['', [Validators.required]],
      installationType: ['', [Validators.required]],
      installation: ['', [Validators.required]]
    });
    this.installationTypes = this.selectService.getInstallationTypes();
    this.hoursForReservation = this.selectService.getHoursForReservation();
  }
  ngOnInit() {
    this.userId = this.rutaActiva.snapshot.paramMap.get('id'); // id del usuario de la reserva
    this.getJugador(this.userId);
  }

  onSelect(installationTypeIdEvent: Event) {
    const installationTypeEventTarget = installationTypeIdEvent.target as HTMLSelectElement;
    this.installationTypeTarget = installationTypeEventTarget.value;
    this.installations = this.selectService.getInstallations().filter((item) => item.NUM_PISTA == parseInt(installationTypeEventTarget.value));
  }

  onChange(installationEvent: Event) {
    const installationEventTarget = installationEvent.target as HTMLSelectElement;
    this.installationTarget = installationEventTarget.value;

    this.recuperarHoras();

  }

  onDate(event: any) {
    console.log('Fecha cambiada:', event);
    this.recuperarHoras();
  }

  matcher = new MyErrorStateMatcher();

  saveData() {
    console.log(this.newReserveForm.value);
    const type: InstallationType[] = this.recuperarTipoPistaId();
    const hour: ReservationHour[] = this.selectService.getHoursForReservation().filter(hora => hora.id == this.newReserveForm.controls["initTime"].value);
    const userId: Number = this.usuario.id;
    const tipoInstalacion: string = type[0].name.toUpperCase();
    const numPista: string = this.installationTarget;
    const fecha: string = this.formattedDate();
    const hora: string = hour[0].name;
    const tieneLuz: string = this.newReserveForm.controls["light"].value as string;
    const pagado: string = this.newReserveForm.controls["paid"].value as string;

    if (this.newReserveForm.valid) {

      this.newReserva = new NewReserve(userId, fecha, hora, tieneLuz, tipoInstalacion, numPista, pagado);

      this.create();

    }
  }

  recuperarTipoPistaId() {
    return this.selectService.getInstallationTypes().filter((item) => item.installationTypeId === parseInt(this.installationTypeTarget));
  }

  recuperarHoras() {
    const type: InstallationType[] = this.recuperarTipoPistaId();

    let formattedDate: string = this.formattedDate();

    let datos = {
      fecha_reserva: formattedDate,
      tipo_pista: type[0].name.toUpperCase(),
      num_pista: this.installationTarget
    }

    this.selectService.Horas_reserva(datos).subscribe({
      next: reservas => {
        let horasTotales: ReservationHour[] = this.selectService.getHoursForReservation();
        let horasOcupadas: ReservationModel[] = reservas.data;

        console.log('horas totales: ' + horasTotales);
        console.log('horas reservadas: ' + horasOcupadas);

        if (reservas.data.length === 0) {
          this.hoursForReservation = horasTotales;
        } else {
          // Obtener solo las horas a eliminar del array de reservas
          const horasAEliminar = horasOcupadas.map(reserva => reserva.hora_reserva);

          // Filtrar el array de horas totales eliminando las horas que coinciden con el array a eliminar
          const horasFiltradas = horasTotales.filter(hora => !horasAEliminar.includes(hora.name));

          this.hoursForReservation = horasFiltradas;
        }
      },
      error: error => {
        console.log("Error al buscar pista", error);
      }
    });
  }

  formattedDate() {
    let dateValue: Date = this.newReserveForm.controls["date"].value;

    let formattedDate: string = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  // Creamos la reserva y se la pasamos al servicio
  create(): void {

    this.selectService.Create_reserva(this.newReserva).subscribe({
      next: reserva => {
        console.log("Reserva creada", reserva, this.newReserva);
        this.recuperarHoras();
      },
      error: error => {
        console.log("Crear Reserva error", error);
      }
    });

  }

  getJugador(id: any): void {
    // Buscamos todos los jugadores
    this.selectService.Read_one(id).subscribe({
      next: usuario => {
        console.log("Buscar jugador", usuario.data);
        this.usuario = usuario.data;
        this.nombre = usuario.data.name;
        this.apellidos = usuario.data.apellidos;
      },
      error: error => {
        console.log("Buscar un jugador", error);
      }
    });

  }

}
