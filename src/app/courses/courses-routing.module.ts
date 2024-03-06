import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseCreateComponent} from "./course-create/course-create.component";
import {CourseEditComponent} from "./course-edit/course-edit.component";
import {CourseViewComponent} from "./course-view/course-view.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: CourseListComponent },
  { path: 'create', component: CourseCreateComponent },
  { path: ':id/edit', component: CourseEditComponent },
  { path: ':id', component: CourseViewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class CoursesRoutingModule { }
