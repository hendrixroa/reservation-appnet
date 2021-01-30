import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {AddContactTypeComponent} from "./contact-type/add-contact-type/add-contact-type.component";
import {EditContactTypeComponent} from "./contact-type/edit-contact-type/edit-contact-type.component";
import {ListContactTypeComponent} from "./contact-type/list-contact-type/list-contact-type.component";
import {EditContactComponent} from "./contact/edit-contact/edit-contact.component";
import {AddContactComponent} from "./contact/add-contact/add-contact.component";
import {ListContactComponent} from "./contact/list-contact/list-contact.component";

const routes: Routes = [
  { path: 'add-contact-type', component: AddContactTypeComponent },
  { path: 'list-contact-type', component: ListContactTypeComponent },
  { path: 'edit-contact-type/:id', component: EditContactTypeComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'list-contact', component: ListContactComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
