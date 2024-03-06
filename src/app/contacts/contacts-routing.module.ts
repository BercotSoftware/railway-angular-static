import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactCreateComponent} from "./contact-create/contact-create.component";
import {ContactEditComponent} from "./contact-edit/contact-edit.component";
import {ContactViewComponent} from "./contact-view/contact-view.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'create', component: ContactCreateComponent },
  { path: ':id/edit', component: ContactEditComponent },
  { path: ':id', component: ContactViewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class ContactsRoutingModule { }
