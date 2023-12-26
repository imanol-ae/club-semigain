import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { COLUMNS_SCHEMA, CONTACT_COLUMNS_SCHEMA } from '../../models/personal-info-schema';
import { USER_DATA } from '../../mockup_data/players';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from "@angular/forms"; // forms stuff


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

  public mensaje: string;
  public editado: string;

  constructor(private rutaActiva: ActivatedRoute, private _jugadores : SelectService) {
    //this.fecha=0-0-0000;
   // this.fecha = new Date("2017-01-26");
    this.jugador = new NewPlayer(0,'','',this.fecha,'','','','','','','','',this.fecha,'','');
    //this.reservas = new LookReserve(0,'','','',0,0,'',0);
   // this.instalacion = new Installation(0,'',0);
    this.arrayLabelsPersonales = ['Nombre', 'Apellidos', 'Nacimiento', 'Sexo', 'Numero de socio'];
    this.arrayLabelsContacto = ['Direccion', 'Municipio', 'Provincia', 'Corre electronico'];
    this.patronNumSocio = '^[0-9]{3}' + '[A-Z]';
    this.patronNombresApellidos = '[a-zA-Z ]{2,254}';
    //this.patronEmail = '[a-z0-9._%+-]+@[a-z0-9.-]'+'.[a-z]{2,4}$';
    //this.patronEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
   // this.patronEmail = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    //this.fb.group = new FormBuilder
   // this.rex = new RegExp(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/);
    this.rex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/);
    this.patronEmail = '[a-z0-9._%+-]' + '@[a-z0-9.-]' + '.[a-z]{2,4}';

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
        },
        error : error=>{
          console.log("Buscar un jugador", error);
        }
      });

  }



  editar(id:number, nom :string, ape:string, fecha_na : Date, sex : string, num_so:string, dire:string, muni:string, provin : string, email:string, fecha_alt:string, fecha_baj : Date, pass:string, es_admin:string){
    // Recogemos los datos
    this.mensaje="";
    const buscar = num_so.match(this.patronNumSocio);
    const buscarNom = nom.match(this.patronNombresApellidos);
    const buscarApe = ape.match(this.patronNombresApellidos);
   /*
    console.log(buscarEmail);
    const re =   /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const buscarEmail = email.match(this.rex);
    console.log(buscarEmail);
    */

    // Meter los demas datos pruebas
    if (nom =="" || ape =="" || sex =="" || num_so ==""|| dire ==""){
      console.log("Formulario no enviado");
      this.mensaje= "No puedes dejar campos vacios.\r\n";
    }
     if (buscar?.[0] != buscar?.input){
      console.log("Formulario no enviado");
      this.mensaje+= "Patron no aceptado.\r\n";
    }
    if(buscarNom?.[0] != buscarNom?.input){
      console.log("Formulario no enviado");
      this.mensaje+= "Patron noaceptado nom.\r\n";
    }
    if(buscarApe?.[0] != buscarApe?.input){
      console.log("Formulario no enviado");
      this.mensaje+= "Patron no aceptado ape.\r\n";
    }
    /*
    if(buscarEmail?.[0] != buscarEmail?.input){
      console.log("Formulario no enviado");
      this.mensaje+= "Patron no aceptado email.\r\n";
    }*/

    else {
      // Si son validos
      console.log("Formulario Enviado");
      this.jugador = new NewPlayer(id, nom, ape, fecha_na , sex, dire,muni,provin,'',email,num_so,fecha_alt,fecha_baj ,es_admin,pass);
      this.update(id);
      this.editado=" Campos editados correctamente";
    }
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

  /*
  cambioNombre(valor:any) {
    console.log("Nombre " + valor);
    this.nombre=valor;
  }
  cambioApellido(valor:any) {
    console.log("Apellido " + valor);
    this.apellido=valor;
  }
  cambioSexo(valor:any) {
    console.log("Sexo " + valor);
    this.sexo=valor;
  }
  cambioFechaNacimiento(valor:any) {
    console.log("Fecha nacimiento " + valor);
    this.fecha_nacimiento=valor;
  }
  cambioNumeroSocio(valor:any) {
    console.log("Numero de socio " + valor);
    this.numero_socio=valor;
  }*/
}
