import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { ActivitiesComponent } from './layout/activities/activities.component';
import { LoginComponent } from './shared/login/login.component';
import { ValidatePlayersComponent } from './administrator/validate-players/validate-players.component';
import { ForgottenPasswordComponent } from './shared/forgotten-password/forgotten-password.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { PlayerReservesInPlayerComponent } from './player/player-reserves-in-player/player-reserves-in-player.component';
import { NewReserveComponent } from './player/new-reserve/new-reserve.component';
import { PersonalDataPlayerComponent } from './player/personal-data-player/personal-data-player.component';
import { AdministratorHomeComponent } from './administrator/administrator-home/administrator-home.component';
import { PlayersComponent } from './administrator/players/players.component';
import { AdministratorReservesComponent } from './administrator/administrator-reserves/administrator-reserves.component';
import { PersonalDataAdminComponent } from './administrator/personal-data-admin/personal-data-admin.component';
import { NewPlayerComponent } from './player/new-player/new-player.component';
import { PlayerInAdminComponent } from './administrator/player-in-admin/player-in-admin.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'quienes-somos', component: AboutUsComponent },
  { path: 'actividades', component: ActivitiesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validar-jugadores/:id', component: ValidatePlayersComponent },
  { path: 'recuperar-contrasena', component: ForgottenPasswordComponent },
  { path: 'inicio-jugador/:id', component: PlayerHomeComponent },
  { path: 'inicio-administrador/:id', component: AdministratorHomeComponent },
  { path: 'reservas-jugador/:id', component: PlayerReservesInPlayerComponent },
  { path: 'nueva-reserva/:id', component: NewReserveComponent },
  { path: 'jugadores/:id', component: PlayersComponent },
  { path: 'reservas-total/:id', component: AdministratorReservesComponent },
  { path: 'datos-personales-jugador/:id', component: PersonalDataPlayerComponent },
  { path: 'datos-personales-administrador/:id', component: PersonalDataAdminComponent },
  { path: 'jugador/:id/:id_admin', component: PlayerInAdminComponent },
  { path: 'nuevo-jugador', component: NewPlayerComponent },
  { path: 'regenerar-contrasena', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
