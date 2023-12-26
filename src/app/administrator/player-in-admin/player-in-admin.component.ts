import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// Servicio
import { SelectService } from 'src/app/services/select.service'; 

@Component({
  selector: 'app-player-in-admin',
  templateUrl: './player-in-admin.component.html',
  styleUrls: ['./player-in-admin.component.scss']
})
export class PlayerInAdminComponent implements OnInit {
  
  public nombre : string;
  public apellidos : string;

  constructor(private rutaActiva: ActivatedRoute, private _buscarAdmin: SelectService) { }

  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.paramMap.get('id_admin');
    this.getAdministrador(id);
  }

  // Obtenemos al administrador pasandosela al servicio el id (id del jugador)
  getAdministrador(id: any):void{
    this._buscarAdmin.Read_one(id).subscribe({
      next :administrador=>{
        console.log("Buscar un administrador", administrador.data);
       // this.administrador = new NewPlayer(data.id,data.name,data.apellidos,data.fecha_nacimiento,data.sexo, data.direccion_postal,data.municipio,data.provincia,data.imagen_perfil, data.email, data.numero_socio, data.fecha_baja, data.fecha_alta, data.es_admin, data.password);
     
       this.nombre=administrador.data.name;
       this.apellidos=administrador.data.apellidos;
      },
      error : error=>{
        console.log("Buscar un juagor", error);
      }
    });
  }

}
