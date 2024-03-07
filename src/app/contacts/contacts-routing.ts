import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactCreateComponent} from "./contact-create/contact-create.component";
import {ContactEditComponent} from "./contact-edit/contact-edit.component";
import {ContactViewComponent} from "./contact-view/contact-view.component";
import {Routes} from "@angular/router";

export const CONTACTS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ContactListComponent },
  { path: 'create', component: ContactCreateComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: ':id', component: ContactViewComponent }
]

