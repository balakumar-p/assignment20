import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FileModel } from '../model/file.model';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  files: FileModel[];
  fileInfo: FileModel;
  valButton = "Submit";
  errorMessage: any;
  spinner: boolean = false;
  fileName: any;
  descriptionDetails: any;
  private uploader: FileUploader;
  constructor(private service: CommonService, private router: Router) { }

  ngOnInit() {
    // console.log('fileInfo: ', this.fileInfo);
    // console.log('files: ', this.files);
    this.getFileList();
  }

  // downloadFile(file:FileModel) {
  //   this.spinner = true;
  //   this.service.fileDownload(file).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       console.log("data");
  //       console.log(data);
  //       this.router.getCurrentNavigation ;    
       
  //     }, (error) => {
  //       this.spinner = false;
  //       this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
  //     }
  //   )
  // }

  deleteFile(file:FileModel) {
    this.spinner = true;
    this.service.fileDelete(file).subscribe(
      (data: any) => {
        console.log(data);
        console.log("data");
        console.log(data);
      this.getFileList();
        
       
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }


  getFileList() {
    this.spinner = true;
    this.service.getfiles().subscribe(
      (data: any) => {
        this.files = data; 
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }

  fileUploadMethod(file) {
    console.log('file: ', file);
    this.service.fileUpload(file).subscribe(
      (data: any) => {
        this.getFileList();
        console.log("dataa==>",data);
      
        console.log("file=== >",file);
       // this.fileInfo = data; 
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }
}
