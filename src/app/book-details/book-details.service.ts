import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  bookData: Array<any>;

  constructor(public afs: AngularFirestore) { }

  borrowBook(id: any, in_stock: any, no_of_issued: any, aboutBook: any, brcd: any, cat: any, bookName: any, noOfCopies: any, author: any, subCategory1: any, subCategory2: any){
    if(in_stock>0 && no_of_issued<noOfCopies)
    {
      var newInStock:any = in_stock-1;
      var newNoOfIssued =  no_of_issued+1;
    }

    if(no_of_issued<noOfCopies)
    {
      let msg = 'Book Borowed: '+ bookName;
      this.afs.collection('books').doc(id) //document_id
      .set({
            in_stock: newInStock,
            no_of_issued: newNoOfIssued,
            about_book: aboutBook,
            barcode: brcd,
            category: cat,
            name: bookName,
            no_of_copies: noOfCopies,
            publisher: author,
            sub_category_1: subCategory1,
            sub_category_2: subCategory2 
          });
        return msg;
      }

      else
      {
        return 'No More Copies Available';
      }
      //alert("No More Copies Available");
}
}
