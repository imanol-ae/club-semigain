import { Component, OnInit } from '@angular/core';
// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 
import { DatePipe, formatDate } from '@angular/common';
import {  FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

@Component({
  selector: 'app-personal-data-admin',
  templateUrl: './personal-data-admin.component.html',
  styleUrls: ['./personal-data-admin.component.scss']
})
export class PersonalDataAdminComponent implements OnInit {

  public nombre : String;
  public apellidos : String;

  constructor(private _buscarUsuarios : SelectService, public router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    this.getAdministrador(id);

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

}
