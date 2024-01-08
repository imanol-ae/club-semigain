import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { COLUMNS_SCHEMA, CONTACT_COLUMNS_SCHEMA } from '../../models/personal-info-schema';
import { USER_DATA } from '../../mockup_data/players';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NewPlayer } from 'src/app/models/new-player';
import { SearchReserve } from 'src/app/models/search-reserve';
import { Installation } from 'src/app/models/installation';

// Servicio
import { SelectService } from 'src/app/services/select.service';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '@angular/common';




@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit{

 // displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
 // displayedContactColumns: string[] = CONTACT_COLUMNS_SCHEMA.map((col) => col.key);
  //dataSource = USER_DATA;
  dataSource:any;
  //personalImage: string = this.dataSource[0].profile_image;
 // columnsSchema: any = COLUMNS_SCHEMA;
 // contactColumnsSchema: any = CONTACT_COLUMNS_SCHEMA;
 public fb: FormBuilder;

  public jugador:NewPlayer;
  public jugadorBuscar:NewPlayer;
  public reservas:SearchReserve;
  public instalacion:Installation;
  public arrayJugadores : Array<NewPlayer> =[];
  public arrayBuscarPista : Array<Installation> =[];
  public arrayLabelsPersonales: string[];
  public arrayLabelsContacto: string[];
  public patronNumSocio : string;
  public patronNombresApellidos : string;
  public patronEmail : string;
  public rex : RegExp;
  public fecha : Date;
  public fecha_prueba : string;

  public mensajeContacto: string;
  public mensajePersonales: string;

  public editado: string;
  public playerEditar : FormGroup;
 // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  


  constructor(private rutaActiva: ActivatedRoute, private _jugadores : SelectService) {
    //this.fecha=0-0-0000;
   // this.fecha = new Date("2017-01-26");
    this.jugador = new NewPlayer(0,'','','','','','','','','','','',this.fecha,'','');
    //this.reservas = new LookReserve(0,'','','',0,0,'',0);
   // this.instalacion = new Installation(0,'',0);
    //this.arrayLabelsPersonales = ['Nombre', 'Apellidos', 'Nacimiento', 'Sexo'];
    //this.arrayLabelsContacto = ['Direccion', 'Municipio', 'Provincia', 'Corre electronico'];
    //this.patronNumSocio = '^[0-9]{3}' + '[A-Z]';
    //this.patronNombresApellidos = '[a-zA-Z ]{2,254}';
    this.playerEditar = new FormGroup({
    });

  }


  ngOnInit() {
    let id=this.rutaActiva.snapshot.paramMap.get('id');
    console.log(id);
   // this.getAllJugadores();
    this.getJugador(id);

    //console.log(this.fecha);
    //this.fecha_prueba="1991-01-31";
  }

  getJugador(id:any):void{
    // Buscamos todos los jugadores
      this._jugadores.Read_one(id).subscribe({
        next :usuario=>{
          console.log("Buscar jugador", usuario.data);
         // this.meterJugadores(data);
          this.arrayJugadores.push(usuario.data);
          console.log("Array jugador",this.arrayJugadores);
          this.fecha_prueba=this.arrayJugadores[0].fecha_nacimiento.toLocaleString();
          let dia= this.fecha_prueba.substring(0,2);
          let mes= this.fecha_prueba.substring(3,5);
          let anio= this.fecha_prueba.substring(6,10);
          this.fecha_prueba=anio+"-"+mes+"-"+dia;
          console.log(this.fecha_prueba);
        },
        error : error=>{
          console.log("Buscar un jugador", error);
        }
      });

  }

 


  editarPersonales(id:number, nom :string, ape:string, fecha_na : string, sex : string, num_so:string, dire:string, muni:string, provin : string, email:string, fecha_alt:string, fecha_baj : Date, pass:string, es_admin:string){
    // Recogemos los datos
    this.mensajePersonales="";
    
    
    console.log("Formulario Enviado");
    this.jugador = new NewPlayer(id, nom, ape, fecha_na , sex, dire,muni,provin,'',email,num_so,fecha_alt,fecha_baj ,es_admin,pass);
    this.update(id);
    this.mensajePersonales=" Campos editados correctamente";    
    
  }

  editarContacto(id:number, nom :string, ape:string, fecha_na : string, sex : string, num_so:string, dire:string, muni:string, provin : string, email:string, fecha_alt:string, fecha_baj : Date, pass:string, es_admin:string){
    // Recogemos los datos
    this.mensajeContacto="";
  
    console.log("Formulario Enviado");
    this.jugador = new NewPlayer(id, nom, ape, fecha_na , sex, dire,muni,provin,'',email,num_so,fecha_alt,fecha_baj ,es_admin,pass);
    this.update(id);
    this.mensajeContacto=" Campos editados correctamente";    
  }

  
  // Modificamos el jugador y se la pasamos al servicio justo con el id que queremos modificar (id del jugador)
  update(id:any):void{
    this._jugadores.Update(id, this.jugador).subscribe({
      next :data=>{
        console.log("Update", data);

      },
      error : error=>{
        console.log("Update Error", error);
      }
    });
  }
}
