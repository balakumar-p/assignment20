import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  { path: '', component: UserlistComponent },
  { path: 'adduser', component: AdduserComponent }
  // { path: 'uploadfile', component: AdduserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
