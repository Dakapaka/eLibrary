import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { IssueService } from '../issue.service';
import { Book } from '../model/book';
import { Issue } from '../model/issue';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private router: Router, private bookService: BooksService, private issueService: IssueService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.date = new Date()
    this.dateNo = this.date.getDate()
  
    if(this.user.notifications != null){
      for(let i = 0; i < this.user.notifications.length; i++){
        this.notifications.push(this.user.notifications[i])
      }
    }
    this.bookService.getAllBooks().subscribe((data: Book[])=>{
      this.allBooks = data
      this.i = this.dateNo % this.allBooks.length
      this.issueService.getAllIssues().subscribe((is: Issue[])=>{
        this.allIssues = is
        this.allIssues.forEach(element => {
          if(element.user == this.user.username && element.returned == false){
            this.userIssues.push(element)
          }
        });
        this.userIssues.forEach(element => {
          if((new Date(element.deadlineDate).getTime() - new Date(element.issueDate).getTime()) / (86400*1000) <= 2){
            this.deadlineApproaching = true;
            this.bookDeadlineApproaching.push(element.book)
          }
          else this.deadlineApproaching = false
        });
        this.userIssues.forEach(element => {
          if((new Date(element.deadlineDate).getTime() - new Date(element.issueDate).getTime()) / (86400*1000) < 0){
            this.deadlinePassed = true;
            this.bookDeadlinePassed.push(element.book)
          }
          else this.deadlinePassed = false
        });
        if(this.userIssues.length == 3){
          this.threeBooks = true;
        }
        else this.threeBooks = false
        if(this.deadlineApproaching){
          for(let i = 0; i < this.bookDeadlineApproaching.length; i++){
            this.notifications.push("Ističe vam rok za vraćanje knjige " + this.bookDeadlineApproaching[i] +"!")
          }
        }
        if(this.deadlinePassed){
          for(let i = 0; i < this.bookDeadlineApproaching.length; i++){
            this.notifications.push("Istekao vam je rok za vraćanje knjige " + this.bookDeadlinePassed[i] +"!")
          }
        }
        if(this.threeBooks){
          this.notifications.push("Dostigli ste maksimalan broj zaduženih knjiga - 3!")
        }
        if(this.user.blocked){
          this.notifications.push("Blokirani ste!")
        }
        this.user.booksAdded.forEach(element => {
          this.booksAdded.push(element)
        });
        this.userService.updateNotifications(this.user.username, null).subscribe(resp5=>{
          if(resp5['message']=='ok'){
          }
        })
      })
    })
  }

  reservationsIssued: string[] = []
  booksAdded: string[] = []
  bookDeadlineApproaching: string[] = []
  bookDeadlinePassed: string[] = []
  notifications: string[] = []
  threeBooks: boolean
  deadlinePassed: boolean
  deadlineApproaching: boolean
  userIssues: Issue[] = []
  allIssues: Issue[] = []
  user: User
  picture: string
  allBooks: Book[] = []
  i: number
  min: number
  max: number
  date: Date
  dateNo: number

  getToSearch(){
    this.router.navigate(['search'])
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  getToRequestAddBook(){
    this.router.navigate(['request-add-book'])
  }

  getToViewIssued(){
    this.router.navigate(['view-issued'])
  }

  getToViewHistory(){
    this.router.navigate(['view-history'])
  }

}
