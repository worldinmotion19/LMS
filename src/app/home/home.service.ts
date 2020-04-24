import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  jsonData: any;
 
  constructor(public afs: AngularFirestore) {

  }

  filterItems(searchTerm : any){

    return this.afs.collection('books',ref => ref.where('name', '>=', searchTerm)
    .where('name', '<=', searchTerm + '\uf8ff'))
    .snapshotChanges()

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
