import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }

  //Add user
  addUser(user) {
    return this.http.post('http://localhost:8090/users/add', user);
  }

  //Get user
  getUser() {
    return this.http.get('http://localhost:8090/users/getuser');
  }

  //File upload
  fileUpload(file) {
    return this.http.post('http://localhost:8090/file/uploadfile', file);
  }

  //File download
  fileDownload(file) {
    return this.http.get('http://localhost:8090/file/' + file.filename , file);
  }

  //File list
  fileList() {
    return this.http.get('http://localhost:8090/file/uploadfile');
  }
}
