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
  displayedColumns: string[] = RESERVES_COLUMNS_SCHEMA.slice(1,11).map((col) => col.key);
  columnsSchema: any = RESERVES_COLUMNS_SCHEMA;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  //dataSource = new MatTableDataSource(RESERVE_DATA);
  datos: LookReserve[] = [];
  dataSource:any;

  public jugador:NewPlayer;
  public reservas:LookReserve;
  public instalacion:Installation;
  public arrayBuscarReservas : Array<LookReserve> =[];
  public arrayBuscarPista : Array<Installation> =[];

  
  constructor(private rutaActiva: ActivatedRoute, private _reservas : SelectService) { 
    this.rutaActiva.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.jugador = new NewPlayer(0,'','','','','','','','','','','','','','');
    this.reservas = new LookReserve(0,'','','',0,0,'',0);
    this.instalacion = new Installation(0,'',0);

  }

  ngOnInit() {
    
    let id = this.rutaActiva.snapshot.paramMap.get('id');
   // console.log(id);
  //  this.getReserva(id);
    this.getAllPista();
    this.getReservas(id);
    this.dataSource = new MatTableDataSource<LookReserve>(this.arrayBuscarReservas);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Reservas por página';

   // var myJsonString = JSON.stringify(this.arrayBuscarReservas)
    //this.dataSource = new MatTableDataSource(myJsonString);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

      // Obtenemos la reserva del jugador pasandosela al servicio el id (id del jugador)
      getReservas(id: any):void{
        this._reservas.Read_reservas().subscribe({
          next :data=>{
            console.log("Buscar reservas", data);
            this.meterReservas(data, id);
            //this.reservas = new LookReserve(data.ID_RESERVA,data.FECHA_RESERVA,data.APELLIDOS,data.HORA_RESERVA,data.ID_USUARIO, data.ID_PISTA,'',0);
            
           // console.log(this.jugador);
          },
          error : error=>{
            console.log("Buscar un juagor", error);
          }
        });
      }

    // Obtenemos la reserva del jugador pasandosela al servicio el id (id del jugador)
    /*
    getReserva(id: any):void{
      this._reservas.Read_una_reserva(id).subscribe({
        next :data=>{
          console.log("Buscar reservas", data);
          this.reservas = new LookReserve(data.ID_RESERVA,data.FECHA_RESERVA,data.APELLIDOS,data.HORA_RESERVA,data.ID_USUARIO, data.ID_PISTA,'',0);
          
          console.log(this.jugador);
        },
        error : error=>{
          console.log("Buscar un juagor", error);
        }
      });
    }*/

    getPista(id: any):void{
      this._reservas.Read_una_instalacion(id).subscribe({
        next :data=>{
          //console.log("Buscar una instalacion", data);
         this.instalacion = new Installation(data.ID_PISTA, data.TIPO_PISTA, data.NUM_PISTA);
         //this.meterInstalacionYnumero(data);
          console.log(this.instalacion);
        },
        error : error=>{
          console.log("Buscar un instalacion", error);
        }
      });
    }

    getAllPista():void{
      this._reservas.Read_instalaciones().subscribe({
        next :data=>{
        console.log("Buscar una instalaciones", data);
       //  this.instalacion = new Installation(data.ID_PISTA, data.TIPO_PISTA, data.NUM_PISTA);
          this.meterInstalacionYnumero(data);
         // console.log(this.instalacion);
        },
        error : error=>{
          console.log("Buscar instalaciones", error);
        }
      });
    }
    
    meterReservas(reservas: any, id:any){
      for (let i = 0; i < reservas.length; i++) {
        for (let y = 0; y < this.arrayBuscarPista.length; y++){
          if(reservas[i].ID_USUARIO == id && reservas[i].ID_PISTA == this.arrayBuscarPista[y].ID_PISTA){
            //this.getPista(reservas[i].ID_PISTA);
            this.reservas = new LookReserve(reservas[i].ID_RESERVA,reservas[i].FECHA_RESERVA,reservas[i].HORA_RESERVA,reservas[i].TIENE_LUZ,reservas[i].ID_USUARIO, reservas[i].ID_PISTA,this.arrayBuscarPista[y].TIPO_PISTA,this.arrayBuscarPista[y].NUM_PISTA);
            this.arrayBuscarReservas.push(this.reservas);
          }
        }
      
      }
      console.log("Array Reservas",this.arrayBuscarReservas);
    }


    meterInstalacionYnumero(instalacion : any){
      for (let i = 0; i < instalacion.length; i++) {
          this.arrayBuscarPista.push(instalacion[i]);
      }
      console.log("Array Pistas",this.arrayBuscarPista);
    }

    
}





