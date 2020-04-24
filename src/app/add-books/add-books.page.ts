import { Component, OnInit } from '@angular/core';
import { AddBooksService } from './add-books.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScannerOptions,  BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
})


export class AddBooksPage implements OnInit {
  private bookData : FormGroup;

  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(public addBookService : AddBooksService, private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner) { 
    this.bookData = this.formBuilder.group({
      name: [''],
      category: [''],
      subCategory:[''],
      publisher:[''],
      about:[''],
      barcode:['']
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.bookData.value);
    this.addBookService.addBooks(this.bookData.value)
    .then(
      res => {
        this.resetFields();
        //this.router.push('/home');
      }
    )
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
      })
      .catch(err => {
        console.log("Error", err);
      });
    }
}
