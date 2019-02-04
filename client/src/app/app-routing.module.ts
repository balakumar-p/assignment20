import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddeduserComponent } from './addeduser/addeduser.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

const routes: Routes = [
  { path: '', component: UserlistComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'addeduser', component: AddeduserComponent },
  { path: 'uploadfile', component: UploadfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
