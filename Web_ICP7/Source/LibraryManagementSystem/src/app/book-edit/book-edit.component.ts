import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  isbn = '';
  title = '';
  description = '';
  author = '';
  publisher = '';
  published_year = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  book = {};
  ex_data = {};
  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'isbn': '',
      'title': '',
      'description': '',
      'author': '',
      'publisher': '',
      'published_year': ''
    });

  }
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }
   // consumes get method and update method of the service defined to display and modify the page
  onFormSubmit(form: NgForm) {
    this.api.getBook(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.ex_data = data; 
        this.api.updateBook(this.route.snapshot.params['id'], form, this.ex_data)
          .subscribe(res => {
            this.router.navigate(['/books']);
          }, (err) => {
            console.log(err);
          });
      });

  }


}