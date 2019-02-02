import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { UserDetailsModel } from '../model/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  errorMessage: any;
  spinner: boolean = false;
  users: UserDetailsModel[];
  constructor(private service: CommonService, private router: Router) { }


  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.spinner = true;
    this.service.getUser().subscribe(
      (data: any) => {
        console.log(data);
        console.log("data");
        if (data && data.message === "Users received successfully") {
          console.log("=>" + data.message);
          console.log(this.users);
          this.users = data.users  // this.userInforamtion = data.data;
          // this.userCountCheck(this.userInforamtion);  
          console.log(this.users);
          this.spinner = false;
        } else {
          this.spinner = false;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }
}
