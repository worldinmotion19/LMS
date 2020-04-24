import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddBooksService {

  constructor(public afs: AngularFirestore) { }
 
  addBooks(value: any){
    console.log(value);
    return this.afs.collection('books').doc("100010") //document_id
    .set({
          name: value.name,
          category: value.category.toLowerCase(),
          sub_category_1: value.subCategory.toLowerCase(),
          publisher: value.publisher,
          about_book: value.about,
          barcode: value.barcode
        });
}

}
