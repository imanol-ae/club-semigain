import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss']
})
export class AdministratorHomeComponent implements OnInit {
  
    public administrador:NewPlayer;
    public id : Number;

    constructor(private rutaActiva: ActivatedRoute, private _buscarAdmin: SelectService) {
      this.administrador = new NewPlayer(0,'','','','','','','','','','','','','','');

    }

    ngOnInit(): void {
      let id = this.rutaActiva.snapshot.paramMap.get('id');
      this.getAdministrador(id);
    }

// Obtenemos al administrador pasandosela al servicio el id (id del jugador)
    getAdministrador(id: any):void{
    this._buscarAdmin.Read_one(id).subscribe({
      next :data=>{
        console.log("Buscar un juagor", data);
        this.administrador = new NewPlayer(data.ID_USUARIO,data.NAME,data.APELLIDOS,data.FECHA_NACIMIENTO,data.SEXO, data.DIRECCION_POSTAL,data.MUNICIPIO,data.PROVINCIA,data.IMAGEN_PERFIL, data.EMAIL, data.NUMERO_SOCIO, data.FECHA_BAJA, data.FECHA_ALTA, data.ES_ADMIN, data.PASSWORD);
       // this.id= this.administrador.ID_USUARIO;
      },
      error : error=>{
        console.log("Buscar un juagor", error);
      }
    });
  }
    
}
