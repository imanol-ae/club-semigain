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

  //  USUARIOS
  // creamos el usuario
  Create(usuario : any): Observable<any>{
    return this._http1.post('http://127.0.0.1:8000/api/auth/register/', usuario);

  }

  /*  Create(usuario : any): Observable<any>{
    return this._http1.post('http://51.20.87.109/api/auth/register/', usuario);

  }*/
// auth/register
// auth/login
  Login(usuario: any):Observable<any>{
    return this._http1.post('http://127.0.0.1:8000/api/auth/login/', usuario);
  }
// leemos los usuarios
  Read(): Observable<any>{
      return this._http1.get('http://127.0.0.1:8000/api/usuarios');
  }

  // leemos un usuario
  Read_one(id: number): Observable<any>{
    return this._http1.get('http://127.0.0.1:8000/api/usuarios/'+ id);
}

  // modificamos el usuario
  Update(id: number, datos : any): Observable<any>{
      return this._http1.put('http://127.0.0.1:8000/api/usuarios/' + id, datos);
  }

  // borramos el suaurio
  Delete(id: number): Observable<any>{
      return this._http1.delete('http://127.0.0.1:8000/api/usuarios/' + id);
  }
  /*
  Delete(ID_USUARIO: number): Observable<any>{
      return this._http1.delete('http://localhost:3000/usuarios/' + ID_USUARIO);
  }*/
  //RESERVAS
  // leemos un usuario
  Read_reservas(): Observable<any>{
    return this._http1.get('http://127.0.0.1:8000/api/reservas/');
  }

  // leemos un usuario
  Read_una_reserva(ID_USUARIO: number): Observable<any>{
    return this._http1.get('http://127.0.0.1:8000/api/reservas/'+ ID_USUARIO);
  }

  // PISTAS
  //leemps un id de instalacion
  Read_una_instalacion(ID_PISTA: number): Observable<any>{
    return this._http1.get('http://51.20.81.158:80/api/pistas/'+ ID_PISTA);
  }

  //leemps un id de instalacion
  Read_instalaciones(): Observable<any>{
    return this._http1.get('http://51.20.81.158:80/api/pistas/');
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
     new Installation(1,  '1',1),
     new Installation(2,  '2',1 ),
     new Installation(3, '3',1),
     new Installation(4, '4',2),
     new Installation(5,  '5',3 ),
     new Installation(6,  '6',1),
     new Installation(7,  '1',2 ),
     new Installation(8,  '1',3)
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
