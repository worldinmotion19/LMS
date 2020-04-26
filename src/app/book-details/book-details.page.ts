import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailsService } from './book-details.service';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import {AngularFirestore} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  bookData: any;
  bookId: any;

  constructor(public afs: AngularFirestore, public bookDetailsService : BookDetailsService, private route: ActivatedRoute, private alertCtrl: AlertController, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bookData = this.router.getCurrentNavigation().extras.state.bookData;
        this.bookId = this.router.getCurrentNavigation().extras.state.bookId;       
      }
    });
   }

   async onSubmit(){
     console.log("inside book-details-page.ts onSubmit()")
    let ermsg = this.bookDetailsService.borrowBook(this.bookId, this.bookData.in_stock,this.bookData.no_of_issued,this.bookData.about_book,this.bookData.barcode,this.bookData.category,this.bookData.name,this.bookData.no_of_copies,this.bookData.publisher,this.bookData.sub_category_1,this.bookData.sub_category_2)
    // .then(
    //   res => {
    //     this.router.navigate(['/home']);
    //   }
    // )
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: ermsg,
      buttons: ['OK']
    });
    await alert.present();

    this.router.navigate(['/home']);
  }


  ngOnInit() {
    console.log("inside book details oninit");
    console.log(this.bookData);
    console.log("inside book id oninit");
    console.log(this.bookId);
    console.log(this.bookData.publisher);
  
  }

}
