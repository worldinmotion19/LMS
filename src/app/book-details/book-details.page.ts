import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  bookData: any;

  constructor( private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bookData = this.router.getCurrentNavigation().extras.state.bookData;
      }
    });
   }

  ngOnInit() {
    console.log("inside book details oninit");
    console.log(this.bookData);
  }

}
