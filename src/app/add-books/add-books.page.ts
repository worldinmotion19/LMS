import { Component, OnInit } from '@angular/core';
import { AddBooksService } from './add-books.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScannerOptions,  BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
})


export class AddBooksPage implements OnInit {
  private bookData : FormGroup;

  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  capturedSnapURL:string;
 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private authService: AuthService,public addBookService : AddBooksService, private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner, private router: Router, private camera: Camera) { 
    this.bookData = this.formBuilder.group({
      name: [''],
      category: [''],
      subCategory:[''],
      author:[''],
      about:[''],
      barcode:[''],
      qty:[Number]
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }

  onSubmit(){
    this.upload(this.bookData.value.barcode).then(res => {
      if(res)
      {
        this.addBookService.addBooks(this.bookData.value);
      }
    });
    
  }

  resetFields()
  {
    this.bookData.reset()
    console.log("reset fields");
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        console.log(this.scannedData);
      })
      .catch(err => {
        console.log("Error", err);
      });
    }

  ngOnInit()
  { 
    //this.checkUserLoggedIn();
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

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
      //this.addBookService.uploadImage(base64Image);
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }

  upload(bookName: string)
  {
    return new Promise<boolean>((resolve, reject) => {
    this.addBookService.uploadImage(this.capturedSnapURL,bookName).then(res => {
      console.log("image uploaded ? ");
      console.log(res);
      resolve(res);
    });
  });
  }

}
