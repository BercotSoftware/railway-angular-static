import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";

const coursesRouting = () => import('./courses/courses-routing.module').then(x => x.CoursesRoutingModule)
const contactsRouting = () => import('./contacts/contacts-routing.module').then(x => x.ContactsRoutingModule)
const eventsRouting = () => import('./events/events-routing.module').then(x => x.EventsRoutingModule)
const groupsRouting = () => import('./groups/groups-routing.module').then(x => x.GroupsRoutingModule)


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "courses", loadChildren: coursesRouting },
  { path: "contacts", loadChildren: contactsRouting },
  { path: "groups", loadChildren: groupsRouting },
  { path: "events", loadChildren: eventsRouting },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
