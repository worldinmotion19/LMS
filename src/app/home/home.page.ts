import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  searchTerm : any="";
  jsonData : any;
  //items: Array<any>;
  
  constructor(public data : HomeService) {  }

  ionViewWillEnter(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setFilteredItems();
  }

  setFilteredItems() {
       // this.jsonData = this.data.filterItems(this.searchTerm);
        console.log("jsonData");
        this.jsonData = this.data.getBooks();
        console.log(this.jsonData);
            // .subscribe(result => {
            //   this.items = result;
            // })
        //console.log(this.jsonData);
    }

}
