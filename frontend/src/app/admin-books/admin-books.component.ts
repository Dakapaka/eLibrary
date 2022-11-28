import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { IssueService } from '../issue.service';
import { Book } from '../model/book';
import { Issue } from '../model/issue';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  constructor(private bookService: BooksService, private router: Router, private issueService: IssueService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data: Book[])=>{
      this.allBooks = data
      this.bookService.getAllBooks().subscribe((d: Issue[])=>{
        this.allIssues = d
      })
    })
  }

  allIssues: Issue[] = []
  message: string

  getToUpdateBook(book: Book){
    sessionStorage.setItem('admin-book', JSON.stringify(book))
    this.router.navigate(['admin-update-book'])
  }

  delete(book: Book){
    let isIssued = false
    this.allIssues.forEach(element => {
      if(element.bookID == book.bookID && element.returned == false){
        this.message = "Knjiga je zadužena"
        isIssued = true;
      }
    });
    if(isIssued){
      alert(this.message)
    }else{
      this.bookService.remove(book.bookID).subscribe(resp=>{
        this.bookService.getAllBooks().subscribe((data: Book[])=>{
          this.allBooks = data;
          window.location.reload()
        })
      })
    }
  }

  allBooks: Book[] = []

  front(){
    this.router.navigate(["admin"])
  }

}
