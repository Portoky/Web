import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AddComponent} from "./add/add.component";
import {IndexComponent} from "./index/index.component";
import {UpdateComponent} from "./update/update.component";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'add', component: AddComponent},
  {path: 'update', component: UpdateComponent}
];
