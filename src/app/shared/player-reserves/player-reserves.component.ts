import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RESERVES_COLUMNS_SCHEMA } from '../../models/reserves_schema';
import { RESERVE_DATA } from '../../mockup_data/reserves';

import { NewPlayer } from 'src/app/models/new-player';
import { SearchReserve } from 'src/app/models/search-reserve';
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
  //displayedColumnsDeleted: any = RESERVES_COLUMNS_SCHEMA.splice(3, 2);
 // displayedColumns: string[] = RESERVES_COLUMNS_SCHEMA.slice(1, 8).map((col) => col.key);

  //columnsSchema: any = RESERVES_COLUMNS_SCHEMA;

  public arrayReservas : Array<SearchReserve> =[];
  public id : Number;
  public deuda : number;
  public cantidad : number;
  public fecha: Date;
  public reservas:SearchReserve;
  columnas: string[] = ['Fecha', 'Hora', 'Instalacion', 'Luz', 'Importe', 'Pagado'];



  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
 //dataSource = new MatTableDataSource(RESERVE_DATA);
 //dataSource = new MatTableDataSource(this.arrayReservas)
 dataSource : any;

  constructor(private rutaActiva: ActivatedRoute, private _reservas : SelectService) { 
  //  this.dataSource = new MatTableDataSource(this.arrayReservas);
  this.reservas = new SearchReserve(0,this.fecha,'','',0,0,'',0);

  }
  ngOnInit() {
    let id=this.rutaActiva.snapshot.paramMap.get('id');
    console.log(id);
    this.getAllReservas(id);
    this.deuda=0;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
  getTotal() {
    return RESERVE_DATA.reduce((acc, element) => {
      if (element.paid !== true) return acc + element.price;
      return acc;
    }, 0);
  }*/

  getAllReservas(id:any):void{
  
      // Buscamos todas las reservas
        this._reservas.Read_reservas().subscribe({
          next :reserva=>{
            console.log("Buscar Reservas", reserva.data);
            this.meterArrayReservas(reserva.data, id);
          },
          error : error=>{
            console.log("Buscar un jugador", error);
          }
        });
    }

    meterArrayReservas(data:any, id:any):void{
      for (let i = 0; i < data.length; i++) {
       if(data[i].usuario.id==id){
          this.arrayReservas.push(data[i]);
          this.dataSource = new MatTableDataSource<SearchReserve>(this.arrayReservas);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Reservas por página';
        if(data[i].pago.pagado=='NO'){
          this.cantidad = parseFloat(data[i].pago.cantidad);
          this.deuda=this.cantidad + this.deuda;
          console.log(this.deuda);
        }
       }
    }
    console.log("Array Reservas",this.arrayReservas);
    }
}
