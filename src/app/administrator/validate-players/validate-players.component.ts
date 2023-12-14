import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';


// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 
import { DatePipe, formatDate } from '@angular/common';
import {  FormatWidth, getLocaleDateFormat } from '@angular/common';


@Component({
  selector: 'app-validate-players',
  templateUrl: './validate-players.component.html',
  styleUrls: ['./validate-players.component.scss']
})
export class ValidatePlayersComponent implements OnInit {

  public buscarUsuario : NewPlayer;
  public arrayBuscarUsuario : Array<NewPlayer> =[];
  public nombre : String;
  public apellidos : String;
  public dia : number;
  public mes : number;
  public anio : number;

  /* Para saber la fecha actual*/ 
 // public currentDate1 = new Date().toISOString().substring(0, 10);
 // public currentDate : Date;

   /*Constructor con el servicio, y la ruta*/
   constructor(private _buscarUsuarios : SelectService, public router: Router, private rutaActiva: ActivatedRoute) {
    this.nombre="";
    this.apellidos="";
    const format = 'dd-MM-yyyy';
    const myDate = '2019-06-29';
    const locale = 'en-US';
  //  const currentDate1 = new Date().toISOString().substring(0, 10);
  // this.currentDate = moment
    //this.currentDate1 = this.currentDate1.tod
   // console.log(this.currentDate);
   //this.currentDate = new Date();
    //this.currentDate = new Date(this.currentDate1);
   // console.log(this.currentDate1);
    //console.log(this.currentDate);
  }
   
  ngOnInit() { 
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    this.getAdministrador(id);
    this.read();
    
  }

  // Obtenemos al administrador pasandosela al servicio el id (id del jugador)
  getAdministrador(id: any):void{
    this._buscarUsuarios.Read_one(id).subscribe({
      next :administrador=>{
        console.log("Buscar un administrador", administrador.data);
       this.nombre=administrador.data.name;
       this.apellidos=administrador.data.apellidos;
      },
      error : error=>{
        console.log("Buscar un administrador", error);
      }
    });
  }

   /*Leemos todos los usuarios y los metemos en un array*/ 
   read():void{
    
    this._buscarUsuarios.Read().subscribe({
      next :usuarios=>{
        console.log("Read", usuarios.data);
        this.meterUsuarios(usuarios.data);    
      },
      error : error=>{
        console.log("Read Error", error);
      }
     });
  }

  meterUsuarios(usuarios: any){
    for (let i = 0; i < usuarios.length; i++) {
      if(!usuarios[i].fecha_alta){
        this.arrayBuscarUsuario.push(usuarios[i]);
      }
    }
    console.log("Array usuarios ",this.arrayBuscarUsuario);
  }

  /* Validamos el usuario, metiendo en fecha_alta el dia que se valida, y hacemos el update del usuario validado*/
  validar(id : any){
    this._buscarUsuarios.Read_one(id).subscribe({
      next :usuario=>{
        console.log("Read ", usuario.data);
        let currentDate1 = new Date().toISOString().substring(0, 10);
        this.buscarUsuario = new NewPlayer(usuario.data.id,usuario.data.name,usuario.data.apellidos,usuario.data.fecha_nacimiento,usuario.data.sexo, usuario.data.direccion_postal,usuario.data.municipio,usuario.data.provincia,usuario.data.imagen_perfil, usuario.data.email, usuario.data.numero_socio, currentDate1, usuario.data.fecha_baja, usuario.data.es_admin, usuario.data.password);
        console.log(usuario.data.id);
        this.editar(id, this.buscarUsuario); 
      },
      error : error=>{
        console.log("Read Error", error);
      }
     });
  }

  /* Update del usuario*/
  editar(id:any, data:any){
    this._buscarUsuarios.Update(id, data).subscribe({
      next :usuario=>{
        console.log("update", usuario);
        window.location.reload();
      },
      error : error=>{
        console.log("update Error", error);
      }
     });
  }

  /* Eliminamos al usuario*/
  Eliminar(id:any){
    this._buscarUsuarios.Delete(id).subscribe({
      next :usuario=>{
        console.log("delete", usuario, id);
        window.location.reload();
      },
      error : error=>{
        console.log("delete Error", error);
      }
     });
  }
}
