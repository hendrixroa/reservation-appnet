import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EditContactTypeComponent } from './contact-type/edit-contact-type/edit-contact-type.component';
import { AddContactTypeComponent } from './contact-type/add-contact-type/add-contact-type.component';
import { ListContactTypeComponent } from './contact-type/list-contact-type/list-contact-type.component';
import { ListContactComponent } from './contact/list-contact/list-contact.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { EditReservationComponent } from './reservation/edit-reservation/edit-reservation.component';
import { AddReservationComponent } from './reservation/add-reservation/add-reservation.component';
import { ListReservationComponent } from './reservation/list-reservation/list-reservation.component';

import {routing} from "./app.routing";
import { ContactTypeService } from "./services/contact.type.service";
import { ContactService } from './services/contact.service';
import { ReservationService } from "./services/reservation.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    EditContactTypeComponent,
    AddContactTypeComponent,
    ListContactTypeComponent,
    ListContactComponent,
    AddContactComponent,
    EditContactComponent,
    EditReservationComponent,
    AddReservationComponent,
    ListReservationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    ContactTypeService,
    ContactService,
    ReservationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
