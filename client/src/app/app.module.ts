import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CommonService } from './common.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddeduserComponent } from './addeduser/addeduser.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    AdduserComponent,
    AddeduserComponent,
    UploadfileComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
