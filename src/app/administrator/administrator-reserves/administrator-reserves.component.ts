import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RESERVES_COLUMNS_SCHEMA } from './reserves_schema';
import { RESERVE_DATA } from './reserves';

@Component({
  selector: 'app-administrator-reserves',
  templateUrl: './administrator-reserves.component.html',
  styleUrls: ['./administrator-reserves.component.scss']
})
export class AdministratorReservesComponent {
  displayedColumns: string[] = RESERVES_COLUMNS_SCHEMA.slice(1).map((col) => col.key);
  dataSource = RESERVE_DATA;
  columnsSchema: any = RESERVES_COLUMNS_SCHEMA;

  debt = RESERVE_DATA.reduce((acc, element) => {
    if (element.paid !== true) return acc + element.price;
    return acc;
  }, 0);
}



