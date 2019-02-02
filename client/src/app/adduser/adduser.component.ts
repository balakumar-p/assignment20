import { Component, OnInit } from '@angular/core';
import { UserDetailsModel } from '../model/user.model';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userDetails = new UserDetailsModel();
  valButton = "Add User";
  errorMessage: any;
  spinner: boolean = false;
  
  constructor(private service: CommonService, private router: Router) { }

  ngOnInit() {
  }

  addUser(user) {
    this.service.addUser(user).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.status._success);
        if(res && res.status === 200 ) {    
          this.spinner = false;
          console.log("success");
          this.router.navigateByUrl('addeduser');    
        } else {
          this.spinner = false;

          this.errorMessage = 'Failed: ' + res.message;
        }
        
        console.log("==>"+res);
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to add new user...!!!';
      }
    )
  }
}
