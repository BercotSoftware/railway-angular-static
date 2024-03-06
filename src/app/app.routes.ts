import {Routes} from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {GroupsComponent} from "./groups/groups.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {EventsComponent} from "./events/events.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const coursesModule = () => import('./courses/courses-routing.module').then(x => x.CoursesRoutingModule)
const contactsModule = () => import('./contacts/contactsrouting.module').then(x => x.ContactsRoutingModule)

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "courses", loadChildren: coursesModule },
  { path: "contacts", loadChildren: contactsModule },
  { path: "groups", component: GroupsComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "events", component: EventsComponent },
  { path: "courses", component: CoursesComponent },
  { path: '**', component: PageNotFoundComponent }
];
