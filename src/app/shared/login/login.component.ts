import { Input, Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[SelectService]
})
export class LoginComponent implements OnInit{
  
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public buscarUsuario : NewPlayer;
  public arrayBuscarUsuario : Array<NewPlayer> =[];

   /*Constructor con el servicio, y la ruta*/
   constructor(private _buscarUsuario : SelectService, public router: Router) {
  }
  
  ngOnInit() { 
    this.read();
  }

   /*Leemos todos los usuarios y sumamos uno a la longitud*/ 
   read():void{
    
    this._buscarUsuario.Read().subscribe({
      next :usuarios=>{
        console.log("Read", usuarios);
        this.meterUsuarios(usuarios);    
      },
      error : error=>{
        console.log("Read Error", error);
      }
     });
  }

  submit() {
      // Recogemos los datos
      const name: string = this.formLogin.controls["username"].value as string;
      console.log(name);
      const pass: string = this.formLogin.controls["password"].value as string;
      console.log(pass);
      // Si el formulario es valido
      if (this.formLogin.valid) {
        console.log("DENTRO FORM");
        for (let i = 0; i < this.arrayBuscarUsuario.length; i++) {
          console.log("DENTRO for");
          if (this.arrayBuscarUsuario[i].ES_ADMIN == true && this.arrayBuscarUsuario[i].NOMBRE == name && this.arrayBuscarUsuario[i].PASS == pass){
           console.log("ADMIN");
           this.router.navigate(["/inicio-administrador"]);
          }
          if (this.arrayBuscarUsuario[i].ES_ADMIN == false && this.arrayBuscarUsuario[i].NOMBRE == name && this.arrayBuscarUsuario[i].PASS == pass){
            console.log("JUGADOR");
            this.router.navigate(["/inicio-jugador"]);
           }
        }
      }
      else{
        console.log("No valido");
      }
  }

  meterUsuarios(usuarios: any){
    for (let i = 0; i < usuarios.length; i++) {
      this.arrayBuscarUsuario.push(usuarios[i]);
    }
    console.log("Array ",this.arrayBuscarUsuario);
  }
  //@Input() error: string | null;

  //@Output() submitEM = new EventEmitter();
}
