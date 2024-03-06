import { Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {GroupsComponent} from "./groups/groups.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {EventsComponent} from "./events/events.component";
import {ContactsComponent} from "./contacts/contacts.component";

export const routes: Routes = [
  { path: "", component: EventsComponent },
  { path: "courses", component: CoursesComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "groups", component: GroupsComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "events", component: EventsComponent },
  { path: "courses", component: CoursesComponent },
];
