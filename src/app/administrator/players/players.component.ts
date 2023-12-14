import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public buscarUsuario : NewPlayer;
  public arrayBuscarUsuario : Array<NewPlayer> =[];
  public id_eliminar:number;

   /*Constructor con el servicio y Router*/
   constructor(private _usuario : SelectService, public router: Router) {
  }

  ngOnInit(): void {
    this.read();

  }

   read():void{
    
    this._usuario.Read().subscribe({
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
      if(usuarios[i].es_admin=='NO'){
        this.arrayBuscarUsuario.push(usuarios[i]);
      }
      
    }
    console.log("Array ",this.arrayBuscarUsuario);
  }

  eliminar(id:number){
    this.id_eliminar = id;
    this.delete();
  }

    // Borramos al jugador pasandosela al servicio el id (id del jugador)
    delete():void{
      this._usuario.Delete(this.id_eliminar).subscribe({
        next :data=>{
          console.log("Delete", data, this.id_eliminar);
          window.location.reload();
        },
        error : error=>{
          console.log("Delete Error", error);
        }
    });
    }

}
