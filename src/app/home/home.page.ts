import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  jsonData : any;
  items: Array<any>;
  loadedNameList: Array<any>=[];
  //bookImg: Array<any>=[];
  //bookImgSrch: Array<any>=[];
  isFromLoginIn: boolean;
  
  constructor(public homeservice : HomeService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.isFromLoginIn = this.router.getCurrentNavigation().extras.state.fromLogin;  
        window.location.reload();
      }
    })
  }

  ngOnInit()
  {
    if(!this.isFromLoginIn) 
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
    //await console.log(this.authService.getUserDetails());
  }

  ionViewWillEnter(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setAllItems();
  }

  setAllItems() {
    this.loadedNameList = [];
    var indx = 0;
       // this.jsonData = this.data.filterItems(this.searchTerm);
        this.homeservice.getBooks()
            .then(result => {
              this.items = result;
              // if(this.items.length != this.bookImg.length)
              // {
              //   //console.log("different length...reloading!!! ");
              //   this.items.forEach(childData => {          
              //     this.getImage(childData.payload.doc.data().barcode, indx++);    
              //   })
              // }
              
             // this.getImage(this.items[2].payload.doc.data().barcode);
            });        
    }

    searchByName(event){
      //this.bookImgSrch = [];
      let searchKey: any =event.target.value.toLowerCase();
      console.log("searchKey = "+searchKey);
      this.homeservice.filterItems(searchKey).then((res) => {
        this.loadedNameList = res;
        // console.log(this.loadedNameList);
        // this.bookImg.forEach(bookImgChild => {          
        //   this.loadedNameList.forEach(loadedNameListChild => {
        //     if(bookImgChild.includes(loadedNameListChild.barcode))
        //       this.bookImgSrch.splice(loadedNameListChild.index, 0, bookImgChild);//.push(bookImgChild);
        //   });  
        //});
        //console.log(this.bookImgSrch);
      }).catch((err) => {
        console.log(err);
      })

    }

    openDetailsWithState(indx:number) { //for lsited books in home page
      let navigationExtras: NavigationExtras = {
        state: {
          bookData: this.items[indx].payload.doc.data()
        }
      };
      this.router.navigate(['book-details'], navigationExtras);
    }

    openSearchDetailsWithState(indx:any) { //for search results
      let navigationExtras: NavigationExtras = {
        state: {
          bookData: this.loadedNameList[indx]
        }
      };
      this.router.navigate(['book-details'], navigationExtras);
    }
    // doRefresh(event) {
    //   console.log('Begin async operation');
  
    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     event.target.complete();
    //   }, 2000);
    // }

    // getImage(bookName: string, indx: number)
    // {
    //   var storage = firebase.storage();
    //   var pathReference = storage.ref('books/'+bookName+'.jpeg');
    //   pathReference.getDownloadURL().then(url => {
      
    //     // This can be downloaded directly:
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', url);
    //     xhr.send();
      
    //     // Or inserted into an <img> element:
    //     //console.log("bookname = "+bookName+" index = "+indx+"url="+url);
    //     this.bookImg.splice(indx, 0, url);
    //     //this.bookImg.push(url);
    //   }).catch(function(error) {
    //     // Handle any errors
    //     console.log(error);
    //   });
    // }


}
