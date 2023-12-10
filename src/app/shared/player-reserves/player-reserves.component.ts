import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RESERVES_COLUMNS_SCHEMA } from '../../models/reserves_schema';
import { RESERVE_DATA } from '../../mockup_data/reserves';

import { NewPlayer } from 'src/app/models/new-player';
import { LookReserve } from 'src/app/models/look-reserve';
import { Installation } from 'src/app/models/installation';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-player-reserves',
  templateUrl: './player-reserves.component.html',
  styleUrls: ['./player-reserves.component.scss']
})
export class PlayerReservesComponent implements OnInit {
  //ELiminamos las columnas de nombre y apellidos porque siempre se repiten
  displayedColumnsDeleted: any = RESERVES_COLUMNS_SCHEMA.splice(3, 2);
  displayedColumns: string[] = RESERVES_COLUMNS_SCHEMA.slice(1, 8).map((col) => col.key);

  columnsSchema: any = RESERVES_COLUMNS_SCHEMA;

  public arrayReservas : Array<LookReserve> =[];
  public id : Number;
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  //dataSource = new MatTableDataSource(RESERVE_DATA);
  dataSource = new MatTableDataSource(this.arrayReservas)
 // dataSource : any;

  constructor(private rutaActiva: ActivatedRoute, private _reservas : SelectService) { 
  //  this.dataSource = new MatTableDataSource(this.arrayReservas);

  }
  ngOnInit() {
    let id=this.rutaActiva.snapshot.paramMap.get('id');
    this.getAllReservas(id);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Reservas por página';
    this.dataSource = new MatTableDataSource(this.arrayReservas);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotal() {
    return RESERVE_DATA.reduce((acc, element) => {
      if (element.paid !== true) return acc + element.price;
      return acc;
    }, 0);
  }

  getAllReservas(id:any):void{
  
      // Buscamos todos los jugadores
        this._reservas.Read_reservas().subscribe({
          next :data=>{
            console.log("Buscar jugadores", data);
           // this.meterJugadores(data);
            //this.arrayReservas.push(data);
            this.meterArrayReservas(data, id);
          },
          error : error=>{
            console.log("Buscar un jugador", error);
          }
        });
    }

    meterArrayReservas(data:any, id:any):void{
      for (let i = 0; i < data.length; i++) {
       if(data[i].ID_USUARIO==id){
        this.arrayReservas.push(data[i]);
       }
       
        
    }
    console.log("Array Reservas",this.arrayReservas);
    }


}
