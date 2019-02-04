import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

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
  // return this.http.get('http://localhost:8090/users');
    return this.http.get('http://localhost:8090/users')
    .pipe(map((res:Response) => res.json()));
  }

  // //File upload
  // fileUpload(file) {
  //   console.log("services ==>",file);
  //   alert("service");
  //   alert("file=>"+file.file);
  //   alert("description=>"+file.description);
  //   return this.http.post('http://localhost:8090/upload', file);
  // }

   //File delete
   fileDelete(file) {
    return this.http.get('http://localhost:8090/delete/' + file.filename , file);
 }

  //File download
  fileDownload(file) {
    return this.http.get('http://localhost:8090/file/' + file.filename , file);
  }

  //File list
  getfiles() {
    return this.http.get('http://localhost:8090/files')
    .pipe(map((res:Response) => res.json()));
  }
}
