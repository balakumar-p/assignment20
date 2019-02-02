import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  errorMessage: any;
  spinner: boolean = false;

  constructor(private service: CommonService, private router: Router) { }


  ngOnInit() {
  }
  getUser() {
     this.spinner = true;
    this.service.getUser().subscribe(
      (data: any) => {     
        if (data) {
          // this.userInforamtion = data.data;
          // this.userCountCheck(this.userInforamtion);   
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
