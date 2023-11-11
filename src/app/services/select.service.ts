import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Installation } from '../models/installation';
import { InstallationType } from '../models/installation-type';
import { ReservationHour } from '../models/reservation-hours';
import { NewPlayer } from '../models/new-player';



@Injectable()
export class SelectService {

  constructor(public _http1 : HttpClient){
        
  }

  // ADD USUARIOS
  // creamos el usuario
  Create(usuario : any): Observable<any>{
    return this._http1.post('http://localhost:3000/usuarios/', usuario);
  }

// leemos el usuario
  Read(): Observable<any>{
      return this._http1.get('http://localhost:3000/usuarios/');
  }

  // modificamos el usuario
  Update(ID_USUARIO: number, datos : any): Observable<any>{
      return this._http1.put('http://localhost:3000/usuarios/' + ID_USUARIO, datos);
  }

  // borramos el suaurio
  Delete(ID_USUARIO: number): Observable<any>{
      return this._http1.delete('http://localhost:3000/usuarios/' + ID_USUARIO);
  }

  getInstallationTypes() {
    return [
     new InstallationType(1, 'Tenis' ),
     new InstallationType(2, 'Frontón' ),
     new InstallationType(3, 'Padel' )
    ];
  }
  getInstallations() {
   return [
     new Installation(1, 1, '1' ),
     new Installation(2, 1, '2' ),
     new Installation(3, 1, '3'),
     new Installation(4, 1, '4'),
     new Installation(5, 1, '5' ),
     new Installation(6, 1, '6'),
     new Installation(7, 2, '1' ),
     new Installation(8, 3, '1')
    ];
  }
  getHoursForReservation() {
    return [
      new ReservationHour(1, '9:00' ),
      new ReservationHour(2, '10:00' ),
      new ReservationHour(3, '11:00' ),
      new ReservationHour(1, '12:00' ),
      new ReservationHour(2, '13:00' ),
      new ReservationHour(3, '14:00' ),
      new ReservationHour(1, '15:00' ),
      new ReservationHour(2, '16:00' ),
      new ReservationHour(3, '17:00' ),
      new ReservationHour(1, '18:00' ),
      new ReservationHour(2, '19:00' ),
      new ReservationHour(3, '20:00' ),
      new ReservationHour(1, '21:00' )
    ];
  }

}