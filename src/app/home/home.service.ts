import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import {AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  jsonData: any;
 
  constructor(private afs: AngularFirestore, private http: HttpClient) {

  }

  filterItems(searchTerm : any){

     let searchData=[];

    return new Promise<any>((resolve, reject) => {
      this.http.get('https://us-central1-lms-manh-23bd7.cloudfunctions.net/filterBooks?text='+searchTerm).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })

  }

  getBooks(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/books').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

}
