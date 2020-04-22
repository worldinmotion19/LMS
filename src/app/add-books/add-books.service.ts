import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddBooksService {

  constructor(public afs: AngularFirestore) { }
 
  addBooks(value: any){
    console.log(value);
    return this.afs.collection('books').doc("100008") //document_id
    .set({
          bookname: value.name,
          category: value.category.toLowerCase(),
          subCategory: value.subCategory.toLowerCase(),
          publisher: value.publisher,
          about: value.about,
          barcode: value.barcode
        });
}

}
