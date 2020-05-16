import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailsService } from './book-details.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  bookData: any;
  stock: string;

  constructor(public afs: AngularFirestore, public bookDetailsService : BookDetailsService, private route: ActivatedRoute, private alertCtrl: AlertController, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bookData = this.router.getCurrentNavigation().extras.state.bookData; 
      }
    });
   }

   async onSubmit(){
     console.log("inside book-details-page.ts onSubmit()");
     let ermsg = this.bookDetailsService.borrowBook(this.bookData.barcode, this.bookData.in_stock, this.bookData.no_of_issued, this.bookData.name, this.bookData.no_of_copies);
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
    if(this.bookData)
    {
      if(this.bookData.in_stock)
      this.stock = 'Yes';
    else
      this.stock = 'No'; 
    }
    else
      this.router.navigateByUrl('home');  
  }

}
