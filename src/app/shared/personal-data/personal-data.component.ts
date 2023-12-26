import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewPlayer } from 'src/app/models/new-player';
import { SearchReserve } from 'src/app/models/search-reserve';


// Servicio
import { SelectService } from 'src/app/services/select.service'; 


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public jugador:NewPlayer;
  public fecha: Date;
  public arrayBuscarReservas : Array<SearchReserve> =[];
  public id : number;

  public pagado : String;
  public cantidad : number;
  public deuda : number;


  public idPago: Number;
  public idReserva: Number;

   ///
   columnas: string[] = ['Fecha', 'Hora', 'Tipo de pista', 'Luz', 'Importe', 'Pagado', 'Editar', 'Eliminar'];
   dataSource:any;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


   datos: SearchReserve[] = [];

  constructor(private rutaActiva: ActivatedRoute, private _usuario : SelectService, private _reservas : SelectService) { 

    this.jugador = new NewPlayer(0,'','',this.fecha,'','','','','','','','',this.fecha,'','');


  }

  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    console.log(id);
    this.getJugador(id);
    this.getReservas();
    this.deuda=0;
  }

  // Obtenemos al jugador pasandosela al servicio el id (id del jugador)
  getJugador(id: any):void{
    this._usuario.Read_one(id).subscribe({
      next :usuario=>{
        console.log("Buscar un jugador", usuario);
        this.jugador = new NewPlayer(usuario.data.id,usuario.data.name,usuario.data.apellidos,usuario.data.fecha_nacimiento,usuario.data.sexo, usuario.data.direccion_postal,usuario.data.municipio,usuario.data.provincia,usuario.data.imagen_perfil, usuario.data.email, usuario.data.numero_socio, usuario.data.fecha_alta, usuario.data.fecha_baja, usuario.data.es_admin, usuario.data.password);
        this.id= usuario.data.id;
        console.log(this.jugador.fecha_alta);
      },
      error : error=>{
        console.log("Buscar un jugador", error);
      }
    });
  }

  getReservas() :void{
    this._usuario.Read_reservas().subscribe({
      next :reservas=>{
        console.log("Buscar Reservas", reservas);
        this.meterReservas(reservas.data);
      },
      error : error=>{
        console.log("Buscar Reserva", error);
      }
    });
  }

  meterReservas(reservas: any){
    for (let i = 0; i < reservas.length; i++) {
      if(reservas[i].usuario.id==this.id){
        this.arrayBuscarReservas.push(reservas[i]);
        this.dataSource = new MatTableDataSource<SearchReserve>(this.arrayBuscarReservas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(reservas[i].pago.pagado=='NO'){
          this.cantidad = parseFloat(reservas[i].pago.cantidad);
          this.deuda=this.cantidad + this.deuda;
          console.log(this.deuda);
        }
      }
    }
      console.log("Array Reservas",this.arrayBuscarReservas);
  }

  editar(pagado:any):void{
     
    this.id = pagado.id;
    console.log(this.id);
    this.update(this.id, pagado);
   }

   eliminar(idReserva:any,idPago:any):void{
    
     this.idPago = idPago;
     this.idReserva = idReserva;
     this.eliminarPago(this.idPago);
     this.EliminarReserva(this.idReserva);
     
    }

 // Modificamos el pagado y se la pasamos al servicio justo con el id que queremos modificar (id del pago)
 update(id:any, pagado:any):void{
   this._reservas.Update_pagos(id, pagado).subscribe({
     next :data=>{
       console.log("Update", data);
       window.location.reload();
     },
     error : error=>{
       console.log("Update Error", error);
     }
   });
 }

 eliminarPago(id:any):void{
   this._reservas.Delete_pago(id).subscribe({
     next :data=>{
       console.log("Eliminar pago", data, id);
       window.location.reload();

     },
     error : error=>{
       console.log("Eliminar Error", error);
     }
   });
 }

 EliminarReserva(id:any):void{
   this._reservas.Delete_reserva(id).subscribe({
     next :data=>{
       console.log("Eliminar reserva", data, id);
       window.location.reload();

     },
     error : error=>{
       console.log("Eliminar reserva", error);
     }
   });
 }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
