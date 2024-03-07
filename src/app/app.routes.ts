import {Routes} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const coursesRouting = () => import('./courses/courses-routing').then(x => x.COURSES_ROUTES)
const contactsRouting = () => import('./contacts/contacts-routing').then(x => x.CONTACTS_ROUTES)
const eventsRouting = () => import('./events/events-routing').then(x => x.EVENTS_ROUTES)
const groupsRouting = () => import('./groups/groups-routing').then(x => x.GROUPS_ROUTES)


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "courses", loadChildren: coursesRouting },
  { path: "contacts", loadChildren: contactsRouting },
  { path: "groups", loadChildren: groupsRouting },
  { path: "events", loadChildren: eventsRouting },
  { path: '**', component: PageNotFoundComponent }
];
