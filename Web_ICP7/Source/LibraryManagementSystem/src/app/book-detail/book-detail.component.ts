import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }
 // consumes get by id method of the service defined to display it on the page
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }
 // consumes delete method of the service to delete the record 
  deleteBook(id) {
    this.api.deleteBook(id)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}