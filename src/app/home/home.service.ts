import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  jsonData: any;
 
  constructor(public afs: AngularFirestore) {

      this.jsonData=[
    {"id":1,"link":"https://ionicframework.com/docs/","img":"assets/book1.jpg","owner":"Prasanta kumar Swain","name":"Appraising Job Performance","details":"No matter what type of business or even nonprofit organization you are managing, a written performance appraisal is good management. Employee reviews can serve as a platform for employees to bring forth questions and concerns. This can help increase employee dedication, creativity, and job satisfaction."},
    {"id":2,"link":"https://ionicframework.com/docs/","img":"assets/book2.jpg","owner":"Amarnath Reddy","name":"7 habits of highly effective people by stephen covey","details":"'The 7 habits of Highly Effective People' is a book that aims at providing its readers with the importance of character ethics and personality ethics. The author talks about the values of integrity, courage, a sense of justice and most importantly, honesty. The book is a discussion about the seven most essential habits that every individual must adopt to in order to live a life which is more fulfilling."}

    ];

  }

  filterItems(searchTerm : any){

    //  return this.jsonData.filter((item : any) => {
    //       return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    //   });  

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
