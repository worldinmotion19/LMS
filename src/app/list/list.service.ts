import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  usrName: string;
  empId: any;
  bookDet = [];
  listItems = [];

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

  listMyBooks()
  {
    this.usrName = localStorage.getItem("usrName");
    return new Promise<any>((resolve, reject) => { 
      this.authService.getUserDetails(this.usrName).then(async res => {
      //  console.log("uname = "+this.usrName);
        this.empId = res.emp_id;
        this.bookDet = res.books;
       // console.log("empId"+this.empId);
       // console.log(this.bookDet); 
        let bookJson ;   
        
        this.bookDet.forEach(book => {
          console.log(book);
          let imgUrl, barCode, bookName, status;
          
          this.getBooks(book.book_id).then(bk => {
            console.log(bk);
            bookName = bk.name;
            imgUrl = bk.img_url;
            barCode = bk.barcode;
            console.log('bookname='+bookName+' ; img_url='+imgUrl+' ; barcode='+barCode);
          });
          if(book.date_of_return == new Date().toDateString())
            status = 20; // Status (10 – Lend, 20 -- Expiring Today, 30 – Expired, 40 -- Completed)
          else if(book.date_of_return >= new Date().toDateString())
            status = 30; // Status (10 – Lend, 20 -- Expiring Today, 30 – Expired, 40 -- Completed)
          bookJson = {'book_name':bookName , 'img_url':imgUrl, 'book_id':barCode, 'status':status};
        });
        resolve(bookJson);
      });
    });
  }

  // updateBookStatus()
  // {
  //   var sysDate = new Date();
  //   var lendingDate = sysDate.toDateString();
  //   sysDate.setDate(sysDate.getDate() + 7); // lending book for a week
  //   var returnDate = sysDate.toDateString();

  //   this.bookDet.push({book_id: bookId, date_of_lending: lendingDate, date_of_return: returnDate, status:10});

  //   console.log("updated user");
  //   console.log(this.bookDet);
  //   this.afs.collection('users').doc(this.empId) 
  //   .update({
  //         books: this.bookDet
  //   });
  // }

  getBooks(bookId:string){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/books').doc('100002').get()
      .subscribe(snapshots => {
        console.log(snapshots);
        resolve(snapshots)
      })
    })
  }
}
