import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

import { NewPlayer } from 'src/app/models/new-player';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public jugador:NewPlayer;
  
  constructor(private rutaActiva: ActivatedRoute, private _usuario : SelectService) { 
   // this.rutaActiva.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.jugador = new NewPlayer(0,'','','','','','','','','','','','',false,'');


  }

  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    console.log(id);
    this.getJugador(id);
  }

  // Obtenemos al jugador pasandosela al servicio el id (id del jugador)
  getJugador(id: any):void{
    this._usuario.Read_one(id).subscribe({
      next :data=>{
        console.log("Buscar un juagor", data);
        this.jugador = new NewPlayer(data.ID_USUARIO,data.NOMBRE,data.APELLIDOS,data.FECHA_NACIMIENTO,data.SEXO, data.DIRECCION_POSTAL,data.MUNICIPIO,data.PROVINCIA,data.IMAGEN_PERFIL, data.EMAIL, data.NUMERO_SOCIO, data.FECHA_BAJA, data.FECHA_ALTA, data.ES_ADMIN, data.PASS);
    
        console.log(this.jugador);
      },
      error : error=>{
        console.log("Buscar un juagor", error);
      }
    });
  }

}
