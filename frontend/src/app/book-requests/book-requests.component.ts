import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  constructor(private bookService: BooksService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.bookService.getAllBookRequests().subscribe((data: Book[])=>{
      this.bookRequests = data
      this.bookService.getAllBooks().subscribe((data: Book[])=>{
        this.allBooks = data
        this.sortedBooks = this.bookService.sortBooksByID(this.allBooks)
        if(this.sortedBooks.length == 0){
          this.id = 1
        }
        else{
          this.maxID = this.sortedBooks[0].bookID
          this.id = this.maxID + 1;
        }
      })
    })
  }

  user: User
  notifications: string[] = []
  allBooks: Book[] = []
  sortedBooks: Book[] = []
  bookRequests: Book[] = []
  message: string
  id: number
  maxID: number

  accept(book: Book){
    this.bookService.add(this.id, book.title, book.author, book.genre, book.publisher, book.year, book.language, book.picture).subscribe(respObj=>{
      if(respObj['message']=='ok'){

      }
      else{
        this.message = 'Error'
      }
    })
    this.bookService.delete(book.bookID).subscribe(resp=>{
      alert(resp['message'])
      this.bookService.getAllBookRequests().subscribe((data: Book[])=>{
        this.bookRequests = data;
        this.notifications.push("Dodata je knjiga " + book.title + " koju ste zahtjevali!")
        this.userService.updateBooksAdded(book.user, this.notifications).subscribe(resp5=>{
          if(resp5['message']=='ok'){
            window.location.reload()
          }
        })
        this.router.navigate(['mod'])
      })
    })
  }

  reject(book: Book){
    this.bookService.delete(book.bookID).subscribe(resp=>{
      alert(resp['message'])
      this.bookService.getAllBookRequests().subscribe((data: Book[])=>{
        this.bookRequests = data;
        this.router.navigate(['mod'])
      })
    })
  }

  front(){
    if(this.user.type == 1){
      this.router.navigate(["mod"])
    }
    else if(this.user.type == 2){
      this.router.navigate(["admin"])
    }
    else this.router.navigate(["front-page"])
  }

}
