import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  bookData: Array<any>;
  empId: string;
  usrName: string;

  constructor(public afs: AngularFirestore, private authService: AuthService) { }

  borrowBook(id: any, in_stock: boolean, no_of_issued: number, bookName: string, noOfCopies: number)
  {
    console.log("borrow book service");
    var newInStock = true;

    if(no_of_issued < noOfCopies && in_stock)
    {
      no_of_issued =  no_of_issued + 1;
      if(no_of_issued == noOfCopies)
        newInStock = false;
      let msg = 'Book Borowed: '+ bookName.toUpperCase();
      this.afs.collection('books').doc(id) //document_id
      .update({
            in_stock: newInStock,
            no_of_issued: no_of_issued,
            no_of_copies: noOfCopies
          });
      
      this.updateUser(id); //updates records in users table
      return msg;
      }

      else
      {
        return 'No More Copies Available';
      }
      //alert("No More Copies Available");
  }

  updateUser(bookId: string)
  {
    this.usrName = localStorage.getItem("usrName");
    var bookDet = [];
    var sysDate = new Date();
    var lendingDate = sysDate.toDateString();
    sysDate.setDate(sysDate.getDate() + 7); // lending book for a week
    var returnDate = sysDate.toDateString();

    this.authService.getUserDetails(this.usrName).then(async res => {
      console.log("uname = "+this.usrName);
      this.empId = res.emp_id;
      bookDet = res.books;
      console.log("empId"+this.empId);
      console.log(bookDet);      

      await bookDet.push({book_id: bookId, date_of_lending: lendingDate, date_of_return: returnDate, status:10});

      console.log("updated user");
      console.log(bookDet);
      await this.afs.collection('users').doc(this.empId) 
      .update({
            books: bookDet
      });
    });

  }
}
