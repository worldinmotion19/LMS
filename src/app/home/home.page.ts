import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  searchTerm : any="";
  jsonData : any;
  items: Array<any>;
  
  constructor(public homeservice : HomeService, private authService: AuthService, private router: Router) {}

  ngOnInit()
  { 
    this.checkUserLoggedIn();
  }

  async checkUserLoggedIn(): Promise<void> {
    this.authService.checkUser().then(exists => {
      if(exists)
      {
        this.router.navigateByUrl('home');
      }
      else
      {
        this.router.navigateByUrl('login');
      }
        
    });
  }

  ionViewWillEnter(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setAllItems();
  }

  setAllItems() {
       // this.jsonData = this.data.filterItems(this.searchTerm);
        this.homeservice.getBooks()
            .then(result => {
              this.items = result;
            });
    }

    searchByName(){
      let value = this.searchTerm.toLowerCase();
      console.log("value="+value);
      this.homeservice.filterItems(value)
      .subscribe(result => {
        this.items = result;
      })
    }

    openDetailsWithState(indx:number) {
      let navigationExtras: NavigationExtras = {
        state: {
          bookData: this.items[indx].payload.doc.data(),
          bookId: this.items[indx].payload.doc.id
        }
      };
      this.router.navigate(['book-details'], navigationExtras);
    }

    doRefresh(event) {
      console.log('Begin async operation');
  
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

}
