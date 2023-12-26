import { Component, OnInit } from '@angular/core';
// Servicio
import { SelectService } from 'src/app/services/select.service'; 
import { ActivatedRoute, Params } from '@angular/router';

import { NewPlayer } from 'src/app/models/new-player';
import { SearchReserve } from 'src/app/models/search-reserve';
import { Installation } from 'src/app/models/installation';

@Component({
  selector: 'app-player-reserves-in-player',
  templateUrl: './player-reserves-in-player.component.html',
  styleUrls: ['./player-reserves-in-player.component.scss']
})
export class PlayerReservesInPlayerComponent implements OnInit {
  public jugador:NewPlayer;
  public jugadorBuscar:NewPlayer;
  public reservas:SearchReserve;
  public instalacion:Installation;
  public arrayJugadores : Array<NewPlayer> =[];
  public nombre : string;
  public apellidos : string;
  constructor(private rutaActiva: ActivatedRoute, private _jugadores : SelectService) { }

  ngOnInit(): void {
    let id=this.rutaActiva.snapshot.paramMap.get('id');
    this.getJugador(id);
  }

  getJugador(id:any):void{
    // Buscamos todos los jugadores
      this._jugadores.Read_one(id).subscribe({
        next :usuario=>{
          console.log("Buscar jugador", usuario.data);
          this.nombre = usuario.data.name;
          this.apellidos = usuario.data.apellidos;
        },
        error : error=>{
          console.log("Buscar un jugador", error);
        }
      });
    
  }

}
