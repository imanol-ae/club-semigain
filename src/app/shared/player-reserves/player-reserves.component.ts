import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RESERVES_COLUMNS_SCHEMA } from '../../models/reserves_schema';
import { RESERVE_DATA } from '../../mockup_data/reserves';

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
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  dataSource = new MatTableDataSource(RESERVE_DATA);
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Reservas por página';
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
}