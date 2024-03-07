import {CourseListComponent} from "./course-list/course-list.component";
import {CourseCreateComponent} from "./course-create/course-create.component";
import {CourseEditComponent} from "./course-edit/course-edit.component";
import {CourseViewComponent} from "./course-view/course-view.component";
import {Routes} from "@angular/router";

export const COURSES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: CourseListComponent },
  { path: 'create', component: CourseCreateComponent },
  { path: 'edit/:id', component: CourseEditComponent },
  { path: ':id', component: CourseViewComponent }
]
