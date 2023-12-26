import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Installation } from '../models/installation';
import { InstallationType } from '../models/installation-type';
import { ReservationHour } from '../models/reservation-hours';
import { NewPlayer } from '../models/new-player';



@Injectable()
export class SelectService {

  protected API_URL: String = 'http://127.0.0.1:8000/api';

  constructor(public _http1: HttpClient) {

  }

  //  USUARIOS
  // creamos el usuario
  Create(usuario: any): Observable<any> {
    return this._http1.post(this.API_URL + '/auth/register/', usuario);
  }

  // login de usuario
  Login(usuario: any): Observable<any> {
    return this._http1.post(this.API_URL + '/auth/login/', usuario);
  }
  // leemos los usuarios
  Read(): Observable<any> {
    return this._http1.get(this.API_URL + '/usuarios');
  }

  // leemos un usuario
  Read_one(id: number): Observable<any> {
    return this._http1.get(this.API_URL + '/usuarios/' + id);
  }

  // modificamos el usuario
  Update(id: number, datos: any): Observable<any> {
    return this._http1.put(this.API_URL + '/usuarios/' + id, datos);
  }

  // borramos el suaurio
  Delete(id: number): Observable<any> {
    return this._http1.delete(this.API_URL + '/usuarios/' + id);
  }


  //RESERVAS
  // leemos un usuario
  Read_reservas(): Observable<any> {
    return this._http1.get(this.API_URL + '/reservas/');
  }

  // leemos un usuario
  Read_una_reserva(id: number): Observable<any> {
    return this._http1.get(this.API_URL + '/reservas/' + id);
  }

  Create_reserva(reserva: any): Observable<any> {
    return this._http1.post(this.API_URL + '/reservas/', reserva)
  }

  // eliminamos pago
  Delete_reserva(id: number): Observable<any> {
    return this._http1.delete(this.API_URL + '/reservas/' + id);
  }

  // leemos un usuario
  Update_reserva(id: number, datos: any): Observable<any> {
    return this._http1.put(this.API_URL + '/reservas/' + id, datos);
  }

  // modificacion pago
  Update_pagos(id: number, datos: any): Observable<any> {
    return this._http1.put(this.API_URL + '/pagos/' + id, datos);
  }

  // eliminamos pago
  Delete_pago(id: number): Observable<any> {
    return this._http1.delete(this.API_URL + '/pagos/' + id);
  }

  //recuperamos las horas ocupadas de resevas en el dia
  Horas_reserva(datos:any): Observable<any> {
    return this._http1.post(this.API_URL + '/reserva/horas/', datos);
  }

  // PISTAS
  //leemps un id de instalacion
  /*
  Read_una_instalacion(ID_PISTA: number): Observable<any>{
    return this._http1.get('http://51.20.81.158:80/api/pistas/'+ ID_PISTA);
  }

  //leemps un id de instalacion
  Read_instalaciones(): Observable<any>{
    return this._http1.get('http://51.20.81.158:80/api/pistas/');
  }
  */
  getInstallationTypes() {
    return [
      new InstallationType(1, 'Tenis'),
      new InstallationType(2, 'Frontón'),
      new InstallationType(3, 'Padel')
    ];
  }
  getInstallations() {
    return [
      new Installation(1, '1', 1),
      new Installation(2, '2', 1),
      new Installation(3, '3', 1),
      new Installation(4, '4', 1),
      new Installation(5, '5', 1),
      new Installation(6, '6', 1),
      new Installation(7, '1', 2),
      new Installation(8, '1', 3)
    ];
  }
  getHoursForReservation() {
    return [
      new ReservationHour(1, '9:00'),
      new ReservationHour(2, '10:00'),
      new ReservationHour(3, '11:00'),
      new ReservationHour(4, '12:00'),
      new ReservationHour(5, '13:00'),
      new ReservationHour(6, '14:00'),
      new ReservationHour(7, '15:00'),
      new ReservationHour(8, '16:00'),
      new ReservationHour(9, '17:00'),
      new ReservationHour(10, '18:00'),
      new ReservationHour(11, '19:00'),
      new ReservationHour(12, '20:00'),
      new ReservationHour(13, '21:00')
    ];
  }

}
