import { Component } from '@angular/core';
import { COLUMNS_SCHEMA, CONTACT_COLUMNS_SCHEMA } from '../../models/personal-info-schema';
import { USER_DATA } from '../../mockup_data/players';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  displayedContactColumns: string[] = CONTACT_COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = USER_DATA;
  personalImage: string = this.dataSource[0].profile_image;
  columnsSchema: any = COLUMNS_SCHEMA;
  contactColumnsSchema: any = CONTACT_COLUMNS_SCHEMA;
}