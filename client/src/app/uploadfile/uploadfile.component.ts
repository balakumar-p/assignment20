import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FileModel } from '../model/file.model';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  files: FileModel[];
  valButton = "Submit";
  errorMessage: any;
  spinner: boolean = false;
  constructor(private service: CommonService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.spinner = true;
    this.service.getfiles().subscribe(
      (data: any) => {
        console.log(data);
        console.log("data");
        console.log(data);
        this.files = data; 
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }
}
