import { Component, OnInit } from '@angular/core';
import { AddBooksService } from './add-books.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
})


export class AddBooksPage implements OnInit {
  router: any;
  private bookData : FormGroup;

  constructor(public addBookService : AddBooksService, private formBuilder: FormBuilder) { 
    this.bookData = this.formBuilder.group({
      name: [''],
      category: [''],
      subCategory:[''],
      publisher:[''],
      about:[''],
      barcode:['']
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.bookData.value);
    this.addBookService.addBooks(this.bookData.value)
    .then(
      res => {
        this.resetFields();
        //this.router.navigate(['/home']);
      }
    )
  }

  resetFields()
  {
    console.log("reset fields");
  }

}
