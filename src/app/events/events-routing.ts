import {Routes} from "@angular/router";
import {EventListComponent} from "./event-list/event-list.component";
import {EventCreateComponent} from "./event-create/event-create.component";
import {EventEditComponent} from "./event-edit/event-edit.component";
import {EventViewComponent} from "./event-view/event-view.component";

export const EVENTS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: EventListComponent },
  { path: 'create', component: EventCreateComponent },
  { path: 'edit/:id', component: EventEditComponent },
  { path: ':id', component: EventViewComponent }
]

