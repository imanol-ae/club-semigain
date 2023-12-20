import { Input, Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

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

  public mensaje : String;

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public usuario : NewPlayer;
  public arrayBuscarUsuario : Array<NewPlayer> =[];

   /*Constructor con el servicio, y la ruta*/
   constructor(private _buscarUsuario : SelectService, public router: Router) {
  }

  ngOnInit() {
    this.read();
  }

   /*Leemos todos los usuarios*/
   read():void{
    this._buscarUsuario.Read().subscribe({
      next :usuarios=>{
        console.log("Read", usuarios.data);
        this.meterUsuarios(usuarios.data);
      },
      error : error=>{
        console.log("Read Error", error);
      }
     });
  }

  submit() {
    this.mensaje="";
    // Recogemos los datos
    const name: string = this.formLogin.controls["username"].value as string;
    console.log(name);
    const pass: string = this.formLogin.controls["password"].value as string;
    console.log(pass);
    console.log(this.formLogin.valid);
    // Si el formulario es valido
    if (this.formLogin.valid) {
      this._buscarUsuario.Login({'name': name, 'password': pass}).subscribe({
        next :user=>{
          console.log("Read", user.data);
          this.usuario = user.data;

          if (this.usuario) {
            if (this.usuario.es_admin === 'SI') {
              console.log("ADMIN");
              this.router.navigate(['/inicio-administrador/', this.usuario.id]);
            } else if (this.usuario.fecha_alta === null || this.usuario.fecha_alta === undefined) {
              this.mensaje = "Tu solicitud no está validada por un administrador";
            } else if (this.usuario.fecha_baja != null) {
              this.mensaje = "El usuario introducido esta dado de baja, pongase en contacto con el administrador"
            } else if (this.usuario.es_admin === 'NO') {
              console.log("JUGADOR");
              this.router.navigate(['/inicio-jugador/', this.usuario.id]);
            }
          } else {
            this.mensaje = "No se encontraron datos del usuario";
          }

        },
        error : error=>{
          console.log("Read Error", error);
        }
        });
      console.log(this.usuario);

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
