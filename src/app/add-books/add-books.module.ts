import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBooksPageRoutingModule } from './add-books-routing.module';

import { AddBooksPage } from './add-books.page';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddBooksPageRoutingModule
  ],
  declarations: [AddBooksPage],
  providers: [
    BarcodeScanner
  ]
})
export class AddBooksPageModule {}
