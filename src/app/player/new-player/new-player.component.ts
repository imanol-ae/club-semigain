import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { matchValidator } from './confirm-password.validator';

// Servicio
import { SelectService } from 'src/app/services/select.service'; 

// Model new-player
import { NewPlayer } from 'src/app/models/new-player'; 


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss'],
  providers:[SelectService]
})

export class NewPlayerComponent implements OnInit {

    //newPlayerForm: FormGroup;
    todayDate:Date = new Date();

    public crearUsuario : NewPlayer;
    public ID_USUARIO:number;
    
    public fb: FormBuilder;

    /* Para saber la fecha actual*/ 
    public currentDate = new Date().toISOString().substring(0, 10);

    /*formularios con sus validaciones*/
    newPlayerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)]),
    direction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    municipality: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    province: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    membershipId : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]{3}' + '[A-Z]')]),
    date : new FormControl(this.todayDate, [Validators.required]),
    sex : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    birthdate : new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$'), matchValidator('password2', true)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10),  matchValidator('password1')])
  });

    /*Constructor con el servicio y iniciacios el atributo de la clase reserva*/
    constructor(private _crearUsuario : SelectService) {
      this.crearUsuario = new NewPlayer(0,'','','','','','','','','','','','',false,'');
    }
    
    ngOnInit() { 
      this.read();
    }

    /*Leemos todos los usuarios y sumamos uno a la longitud*/ 
  read():void{
    
    this._crearUsuario.Read().subscribe({
      next :usuarios=>{
        this.ID_USUARIO = usuarios.length +1;
        console.log("Read", usuarios);
      },
      error : error=>{
        console.log("Read Error", error);
      }
     });
  }
  
    matcher = new MyErrorStateMatcher();
  
    saveData(){
      console.log(this.newPlayerForm.value);
       
      // Recogemos los datos
      const name: string = this.newPlayerForm.controls["name"].value as string;
      const surname: string = this.newPlayerForm.controls["surname"].value as string;
      const direccion: string = this.newPlayerForm.controls["direction"].value as string;
      const municipality: string = this.newPlayerForm.controls["municipality"].value as string;
      const sex: string = this.newPlayerForm.controls["sex"].value as string;
      const province: string = this.newPlayerForm.controls["province"].value as string;
      const email: string = this.newPlayerForm.controls["email"].value as string;
      const membershipId: string = this.newPlayerForm.controls["membershipId"].value as string;
      const date: string = this.newPlayerForm.controls["date"].value as string;
      const birthdate: string = this.newPlayerForm.controls["birthdate"].value as string;
      const password1: string = this.newPlayerForm.controls["password1"].value as string;
      const password2: string = this.newPlayerForm.controls["password2"].value as string;

      if (this.newPlayerForm.valid) {
  
        // Los metemos en el una Reserva
        this.crearUsuario = new NewPlayer (this.ID_USUARIO,name, surname, birthdate,sex, direccion, municipality, province,'', email, membershipId, '', '', false, password2);
        console.log(this.crearUsuario, " valido");
        // Creamos la reserva
        this.create();
        
        // Si no son validos
      }else{
         console.log(this.crearUsuario, " no valido");
        }
    }

    // Creamos la reserva y se la pasamos al servicio
  create():void{
    
    this._crearUsuario.Create(this.crearUsuario).subscribe({
        next :usuarios=>{
          console.log("Create", usuarios, this.crearUsuario);
        
        },
        error : error=>{
          console.log("Create Error", error);
        }
    });

  }

}
  
