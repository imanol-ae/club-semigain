import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SelectService } from './services/select.service';

// Consultas
import { HttpClientModule } from '@angular/common/http';


//MDB Material Design for Bootstrap 5
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

//Layout components
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { ActivitiesComponent } from './layout/activities/activities.component';
import { LoginComponent } from './shared/login/login.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { AdministratorHomeComponent } from './administrator/administrator-home/administrator-home.component';
import { PlayerReservesComponent } from './shared/player-reserves/player-reserves.component';
import { NewReserveComponent } from './player/new-reserve/new-reserve.component';
import { PersonalDataComponent } from './shared/personal-data/personal-data.component';
import { PlayersComponent } from './administrator/players/players.component';
import { AdministratorReservesComponent } from './administrator/administrator-reserves/administrator-reserves.component';
import { NewPlayerComponent } from './player/new-player/new-player.component';
import { PersonalDataAdminComponent } from './administrator/personal-data-admin/personal-data-admin.component';
import { PersonalDataPlayerComponent } from './player/personal-data-player/personal-data-player.component';
import { PlayerReservesInPlayerComponent } from './player/player-reserves-in-player/player-reserves-in-player.component';
import { PlayerInAdminComponent } from './administrator/player-in-admin/player-in-admin.component';
import { ForgottenPasswordComponent } from './shared/forgotten-password/forgotten-password.component';
import { PersonalInfoComponent } from './shared/personal-info/personal-info.component';
import { ValidatePlayersComponent } from './administrator/validate-players/validate-players.component';
import { YesNoPipe } from './shared/yes-no.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ActivitiesComponent,
    LoginComponent,
    PlayerHomeComponent,
    AdministratorHomeComponent,
    PlayerReservesComponent,
    NewReserveComponent,
    PersonalDataComponent,
    PlayersComponent,
    AdministratorReservesComponent,
    NewPlayerComponent,
    PersonalDataAdminComponent,
    PersonalDataPlayerComponent,
    PlayerReservesInPlayerComponent,
    PlayerInAdminComponent,
    ForgottenPasswordComponent,
    PersonalInfoComponent,
    ValidatePlayersComponent,
    YesNoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HttpClientModule
  ],
  providers: [ SelectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }