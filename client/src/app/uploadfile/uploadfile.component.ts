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
  fileForm: FileModel;
  valButton = "Submit";
  errorMessage: any;
  spinner: boolean = false;
  fileName: any;
  description: any;
  private uploader: FileUploader;
  constructor(private service: CommonService, private router: Router) { }
  private url = 'http://localhost:8090/upload';

  ngOnInit() {
    this.getFileList();
    this.uploader = new FileUploader({ url: this.url });
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('description', this.description);
    };
    this.uploader.onCompleteAll = () => {
      this.getFileList();

    };
  }


  deleteFile(file: FileModel) {
    this.spinner = true;
    this.service.fileDelete(file).subscribe(
      (data: any) => {
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
}
