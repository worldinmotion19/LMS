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
  items: Array<any>;
  
  constructor(public homeservice : HomeService) {  }

  ionViewWillEnter(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setFilteredItems();
  }

  setFilteredItems() {
       // this.jsonData = this.data.filterItems(this.searchTerm);
        this.homeservice.getBooks()
            .then(result => {
              this.items = result;
            });
       // console.log(this.jsonData);
    }

    searchByName(){
      let value = this.searchTerm.toLowerCase();
      console.log("value="+value);
      this.homeservice.filterItems(value)
      .subscribe(result => {
        this.items = result;
        //this.items = this.combineLists(result, this.age_filtered_items);
      })
      console.log("items=");
      console.log(this.items);
    }

}
