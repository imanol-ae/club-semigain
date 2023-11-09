import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
/*
const USER_DATA = [
  {
    name: 'John Smith',
    occupation: 'Advisor',
    dateOfBirth: '1984-05-05',
    age: 36,
  },
  {
    name: 'Muhi Masri',
    occupation: 'Developer',
    dateOfBirth: '1992-02-02',
    age: 28,
  },
  { name: 'Peter Adams', occupation: 'HR', dateOfBirth: '2000-01-01', age: 20 },
  {
    name: 'Lora Bay',
    occupation: 'Marketing',
    dateOfBirth: '1977-03-03',
    age: 43,
  },
];
*/
const USER_DATA = [
  {
    name: 'John Smith',
    birthdate: '2023-11-07T23:00:00.000Z',
    gender: 'Hombre',
    id: '123C',
    entrydate: '2023-11-07T23:00:00.000Z'
  }
];

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Nombre y Apellidos:',
  },
  {
    key: 'birthdate',
    type: 'date',
    label: 'Nacimiento:',
  },
  {
    key: 'gender',
    type: 'text',
    label: 'Sexo:',
  },
  {
    key: 'id',
    type: 'text',
    label: 'Número de socio:',
  },
  {
    key: 'entrydate',
    type: 'date',
    label: 'Fecha de alta:',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;



  //userTable: FormGroup;
  //control: FormArray;
  //mode: boolean;
  //touchedRows: any;
  //constructor(private fb: FormBuilder) { }

  /*
  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([
      ])
    });
  }
  */

//https://muhimasri.com/blogs/create-an-editable-dynamic-table-using-angular-material/

  /*
  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['Epelde', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      gender: ['Hombre', [Validators.required]],
      dob: ['2023-11-07T23:00:00.000Z', [Validators.required]],
      entrydate: ['2023-11-07T23:00:00.000Z', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['123A', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  editRow(group: FormGroup) {
    group.get('isEditable')?.setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable')?.setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }
  */
}
