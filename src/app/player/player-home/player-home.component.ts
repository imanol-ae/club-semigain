import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NewPlayer } from 'src/app/models/new-player';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 


@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss']
})
export class PlayerHomeComponent implements OnInit {

  public jugador:NewPlayer;
  public id : Number;
  public fecha: Date;
  
  constructor(private rutaActiva: ActivatedRoute, private _usuario : SelectService) { 
   // this.rutaActiva.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.jugador = new NewPlayer(0,'','','','','','','','','','','',this.fecha,'','');


  }
  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    console.log(id);
    this.getJugador(id);
    
  }

  // Obtenemos al jugador pasandosela al servicio el id (id del jugador)
  getJugador(id: any):void{
    this._usuario.Read_one(id).subscribe({
      next :usuario=>{
        console.log("Buscar un jugador", usuario.data);
        //this.jugador = new NewPlayer(data.ID_USUARIO,data.NOMBRE,data.APELLIDOS,data.FECHA_NACIMIENTO,data.SEXO, data.DIRECCION_POSTAL,data.MUNICIPIO,data.PROVINCIA,data.IMAGEN_PERFIL, data.EMAIL, data.NUMERO_SOCIO, data.FECHA_BAJA, data.FECHA_ALTA, data.ES_ADMIN, data.PASS);
                this.jugador = new NewPlayer(usuario.data.id,usuario.data.name,usuario.data.apellidos,usuario.data.fecha_nacimiento,usuario.data.sexo, usuario.data.direccion_postal,usuario.data.municipio,usuario.data.provincia,usuario.data.imagen_perfil, usuario.data.email, usuario.data.numero_socio, usuario.data.fecha_baja, usuario.data.fecha_alta, usuario.data.es_admin, usuario.data.password);

        this.id= this.jugador.id;
        console.log(this.jugador);
      },
      error : error=>{
        console.log(" Error Buscar un jugador", error);
      }
    });
  }

}
