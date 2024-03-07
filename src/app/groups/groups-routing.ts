import {Routes} from "@angular/router";
import {GroupListComponent} from "./group-list/group-list.component";
import {GroupCreateComponent} from "./group-create/group-create.component";
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {GroupViewComponent} from "./group-view/group-view.component";


export const GROUPS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: GroupListComponent },
  { path: 'create', component: GroupCreateComponent },
  { path: 'edit/:id', component: GroupEditComponent },
  { path: ':id', component: GroupViewComponent }
]

