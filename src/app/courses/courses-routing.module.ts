import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {CoursesCreateComponent} from "./courses-create/courses-create.component";
import {CoursesEditComponent} from "./courses-edit/courses-edit.component";
import {CoursesViewComponent} from "./courses-view/courses-view.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: CoursesListComponent },
  { path: 'create', component: CoursesCreateComponent },
  { path: ':id/edit', component: CoursesEditComponent },
  { path: ':id', component: CoursesViewComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class CoursesRoutingModule { }
