import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { IssueService } from '../issue.service';
import { Book } from '../model/book';
import { Issue } from '../model/issue';
import { User } from '../model/user';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private router: Router, private bookService: BooksService, private isssueService: IssueService) { }

  ngOnInit(): void {
    this.i = 0
    let s = 0;
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.isssueService.getAllIssues().subscribe((is: Issue[])=>{
      this.allIssues = is
      this.bookService.getAllBooks().subscribe((books: Book[])=>{
        this.allBooks = books
        this.allBooks.forEach(element => {
          element.timesTaken = 0
        });
        for(let i = 0; i < this.allBooks.length; i++) {
          for(let j = 0; j < this.allIssues.length; j++){
            if(this.allIssues[j].bookID == this.allBooks[i].bookID){
              this.allBooks[i].timesTaken++;
            }
          }
        }
        this.top3Books = this.bookService.sortBooksByTimesTaken(this.allBooks)
      })
    })
  }

  user: User
  picture: string
  top3Books: Book[] = []
  allIssues: Issue[] = []
  allBooks: Book[] = []
  i: number

  getToLogin(){
    this.router.navigate(['login'])
  }

  getToRegister(){
    this.router.navigate(['register'])
  }

  getToSearch(){
    this.router.navigate(['search'])
  }

  prev(){
    if(this.i == 0){
      this.i = 2
    }
    else if(this.i == 1){
      this.i = 0
    }
    else this.i = 1
  }

  next(){
    this.i = (this.i + 1)%3
  }
}
