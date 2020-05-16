import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AddBooksService {
  imgUrl: string;

  constructor(public afs: AngularFirestore, private alertCtrl: AlertController) { }
 
  addBooks(value: any){
    //console.log(value);
   this.getImageURL(value.barcode).then(url => {

     this.afs.collection('books').doc(value.barcode) //document_id
    .set({
          name: value.name.toLowerCase(),
          category: value.category.toLowerCase(),
          sub_category_1: value.subCategory.toLowerCase(),
          author: value.author,
          about_book: value.about,
          barcode: value.barcode,
          in_stock:true,
          no_of_copies:value.qty,
          no_of_issued:0,
          img_url: url
        });
   });

    //  console.log("image url = ");
    //  console.log(this.imgUrl);
    // return this.afs.collection('books').doc(value.barcode) //document_id
    // .set({
    //       name: value.name.toLowerCase(),
    //       category: value.category.toLowerCase(),
    //       sub_category_1: value.subCategory.toLowerCase(),
    //       author: value.author,
    //       about_book: value.about,
    //       barcode: value.barcode,
    //       in_stock:true,
    //       no_of_copies:value.qty,
    //       no_of_issued:0,
    //       img_url: this.imgUrl
    //     });
    
  }

  uploadImage(imageURI,barcode){
    return new Promise<boolean>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('books').child(barcode+'.jpeg');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(true);
        }, err => {
          reject(err);
        })
      })
    });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  getImageURL(bookName: string)
  {
      var storage = firebase.storage();
      var pathReference = storage.ref('books/'+bookName+'.jpeg');
      console.log("inside getImageURL function");
    return new Promise<any>((resolve, reject) => {
      pathReference.getDownloadURL().then(url => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        resolve(url);        
      }).catch(function(error) {
        // Handle any errors
        console.log(error);
      });
    });
  }

}
