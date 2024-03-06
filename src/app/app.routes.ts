import { Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {GroupsComponent} from "./groups/groups.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {EventsComponent} from "./events/events.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CoursesListComponent} from "./courses/courses-list/courses-list.component";
import {CoursesCreateComponent} from "./courses/courses-create/courses-create.component";
import {CoursesEditComponent} from "./courses/courses-edit/courses-edit.component";
import {CoursesViewComponent} from "./courses/courses-view/courses-view.component";

// const coursesModule = () => import('./courses/courses-routing.module').then(x => x.CoursesModule)

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "courses", component: CoursesComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CoursesListComponent },
      { path: 'create', component: CoursesCreateComponent },
      { path: ':id/edit', component: CoursesEditComponent },
      { path: ':id', component: CoursesViewComponent }
    ] },
  { path: "contacts", component: ContactsComponent },
  { path: "groups", component: GroupsComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "events", component: EventsComponent },
  { path: "courses", component: CoursesComponent },
  { path: '**', component: PageNotFoundComponent }
];
