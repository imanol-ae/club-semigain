import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 
//import { Console } from 'console';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss']
})
export class AdministratorHomeComponent implements OnInit {
  
    public administrador:NewPlayer;
    public id : Number;
    public fecha : Date;
    public nombre : string;
    public apellidos : string;

    constructor(private rutaActiva: ActivatedRoute, private _buscarAdmin: SelectService) {
      
      this.administrador = new NewPlayer(0,'','','','','','','','','','','',this.fecha,'','');

    }

    ngOnInit(): void {
      let id = this.rutaActiva.snapshot.paramMap.get('id');
      this.getAdministrador(id);
    }

// Obtenemos al administrador pasandosela al servicio el id (id del jugador)
    getAdministrador(id: any):void{
    this._buscarAdmin.Read_one(id).subscribe({
      next :administrador=>{
        console.log("Buscar un administrador", administrador.data);
       // this.administrador = new NewPlayer(data.id,data.name,data.apellidos,data.fecha_nacimiento,data.sexo, data.direccion_postal,data.municipio,data.provincia,data.imagen_perfil, data.email, data.numero_socio, data.fecha_baja, data.fecha_alta, data.es_admin, data.password);
        this.id= administrador.data.id;
       this.nombre=administrador.data.name;
       this.apellidos=administrador.data.apellidos;
      },
      error : error=>{
        console.log("Buscar un juagor", error);
      }
    });
  }
    
}
