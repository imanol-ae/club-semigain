import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RESERVES_COLUMNS_SCHEMA } from '../../models/reserves_schema';
import { RESERVE_DATA } from '../../mockup_data/reserves';
import { ActivatedRoute, Params } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { NewPlayer } from 'src/app/models/new-player';
import { LookReserve } from 'src/app/models/look-reserve';
import { Installation } from 'src/app/models/installation';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 


@Component({
  selector: 'app-administrator-reserves',
  templateUrl: './administrator-reserves.component.html',
  styleUrls: ['./administrator-reserves.component.scss']
})
export class AdministratorReservesComponent implements OnInit{
 // displayedColumns: string[] = RESERVES_COLUMNS_SCHEMA.slice(1,11).map((col) => col.key);
 // columnsSchema: any = RESERVES_COLUMNS_SCHEMA;
  
 // @ViewChild(MatSort, {static: true}) sort: MatSort;
 // @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  //dataSource = new MatTableDataSource(RESERVE_DATA);
  //datos: LookReserve[] = [];

  public jugador:NewPlayer;
  public reservas:LookReserve;
  public instalacion:Installation;
  public arrayBuscarReservas : Array<LookReserve> =[];
  public arrayBuscarObtener : Array<LookReserve> =[];
  public arrayBuscarPista : Array<Installation> =[];
  public fecha: Date;
  public nombre : String;
  public apellido : String;
  public id:Number;
  public pagado : String;

  public idPago: Number;
  public idReserva: Number;

  ///
  columnas: string[] = ['Nombre', 'Apellidos', 'Fecha', 'Hora', 'Tipo de pista', 'Numero de pista', 'Pagado', 'Editar', 'Eliminar'];
  dataSource:any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  datos: LookReserve[] = [];

  
  constructor(private rutaActiva: ActivatedRoute, private _reservas : SelectService) { 
    this.rutaActiva.snapshot.paramMap.get('id');
    this.jugador = new NewPlayer(0,'','',this.fecha,'','','','','','','','',this.fecha,'','');
    this.reservas = new LookReserve(0,this.fecha,'','',0,0,'',0);

  }

  ngOnInit() {
    
    let id = this.rutaActiva.snapshot.paramMap.get('id');
   // console.log(id);
  //  this.getReserva(id);
    //this.getAllPista();
    this.getReservas();
    this.getAdmin(id);

    //this.dataSource = new MatTableDataSource<LookReserve>(this.arrayBuscarReservas);
    //console.log(this.dataSource);
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.paginator._intl.itemsPerPageLabel = 'Reservas por página';

   // var myJsonString = JSON.stringify(this.arrayBuscarReservas)
    //this.dataSource = new MatTableDataSource(myJsonString);
    //this.datos.push(this.arrayBuscarReservas);
    
  }
  /*
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

      // Obtenemos todas las reservas 
      getReservas():void{
        this._reservas.Read_reservas().subscribe({
          next :reservas=>{
            console.log("Buscar reservas", reservas.data);
            this.meterReservas(reservas.data);
          },
          error : error=>{
            console.log("Buscar un juagor", error);
          }
        });
      }

       // Obtenemos al admin
    getAdmin(id: any):void{
      this._reservas.Read_one(id).subscribe({
        next :admin=>{
          console.log("Buscar un Admin", admin.data);
         
          this.nombre= admin.data.name;
          this.apellido= admin.data.apellidos;

        },
        error : error=>{
          console.log(" Error Buscar un jugador", error);
        }
      });
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
     
    meterReservas(reservas: any){
      for (let i = 0; i < reservas.length; i++) {
            this.arrayBuscarReservas.push(reservas[i]);
            this.dataSource = new MatTableDataSource<LookReserve>(this.arrayBuscarReservas);
           this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          }
          console.log("Array Reservas",this.arrayBuscarReservas);
    }
       
}





