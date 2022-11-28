import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { ExtensionService } from '../extension.service';
import { IssueService } from '../issue.service';
import { Book } from '../model/book';
import { Extension } from '../model/extension';
import { Issue } from '../model/issue';
import { Reservation } from '../model/reservation';
import { User } from '../model/user';
import { ReservationService } from '../reservation.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-issued',
  templateUrl: './view-issued.component.html',
  styleUrls: ['./view-issued.component.css']
})
export class ViewIssuedComponent implements OnInit {

  constructor(private issueService: IssueService, private bookService: BooksService, private router: Router, private userService: UserService, private extensionService: ExtensionService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.issueDate = new Date()
    this.returnDate = new Date()
    this.deadlineDate = 
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.issueService.getAllIssues().subscribe((data: Issue[])=>{
      this.allIssues = data
      this.allIssues.forEach(element => {
        if(element.user == this.user.username && element.returned == false){
          this.showIssues.push(element)
        }
      })
      this.bookService.getAllBooks().subscribe((d: Book[])=>{
        this.allBooks = d
        this.allBooks.forEach(element => {
          this.showIssues.forEach(e => {
            if(e.bookID == element.bookID){
              this.showBooks.push(element)
            }
          })
        })
        this.userService.getAllUsers().subscribe((d: User[])=>{
        this.allUsers = d
        this.allUsers.forEach(element => {
          if(element.username == "admin"){
            this.admin = element
          }
        })
        this.deadline = this.admin.deadline
        this.extensionService.getAllExtensions().subscribe((exts: Extension[])=>{
          this.allExtensions = exts
          this.sortedExtensions = this.extensionService.sortExtensions(this.allExtensions)
          if(this.sortedExtensions.length == 0){
            this.extensionID = 1;
          }
          else{
            this.maxID = this.sortedExtensions[0].id
            this.extensionID = this.maxID + 1;
          }
          this.reservationService.getAllReservations().subscribe((res: Reservation[])=>{
            this.allReservations = res
            this.sortedReservations = this.reservationService.sortReservationsByID(this.allReservations)
            this.issueService.getAllIssues().subscribe((i: Issue[])=>{
              this.allIssues = i
              this.sortedIssues = this.issueService.sortIssuesById(this.allIssues)
              if(this.sortedIssues.length == 0){
                this.issueID = 1;
              }
              else{
                this.maxIssueID = this.sortedIssues[0].id
                this.issueID = this.maxIssueID + 1
              }
              this.allUsers.forEach(ad => {
                if(ad.username == "admin"){
                  this.admin = ad
                }
              });
              this.deadline = this.admin.deadline
              this.deadlineDate = new Date(this.issueDate.getTime() + this.deadline * 86400 * 1000)
            })
          })
        })
      })
    })
  })
}

  notifications: string[] = []
  resRemoved: Reservation
  toBeRemoved: Extension
  issueDate: Date
  deadlineDate: Date
  sortedIssues: Issue[] = []
  issueID: number
  maxIssueID: number
  sortedReservations: Reservation[] = []
  removeRes: Reservation
  allReservations: Reservation[] = []
  sortedExtensions: Extension[] = []
  allExtensions: Extension[] = []
  maxID: number
  extensionID: number
  admin: User
  allUsers: User[] = []
  deadline: number
  user: User
  allIssues: Issue[] = []
  showIssues: Issue[] = []
  allBooks: Book[] = []
  showBooks: Book[] = []
  alreadyIssued: Issue[]=[]
  id: number
  returnDate: Date
  message: string

  getToBook(bookID: number){
    sessionStorage.setItem('bookID', JSON.stringify(bookID))
    this.router.navigate(['books'])
  }

  returnBook(issue: Issue){
    let resUser = null
    this.allIssues.forEach(element => {
      if((element.user == this.user.username) && (element.bookID == issue.bookID) && (element.returned == false)){
        this.id = element.id
      }
    });
    this.issueService.updateIssue(this.user.username, issue.bookID, issue.book, true, this.id, this.returnDate).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        for(let k = 0; k < this.allBooks.length; k++){
          if(this.allBooks[k].bookID == issue.bookID){
            this.bookService.updateBook(this.allBooks[k].bookID, this.allBooks[k].title, this.allBooks[k].author, this.allBooks[k].genre, this.allBooks[k].publisher, this.allBooks[k].year, this.allBooks[k].language, this.allBooks[k].inventory + 1, this.allBooks[k].picture).subscribe(resp=>{
              if(resp['message']=='ok'){
                let s = this.sortedReservations.length - 1
                while(s >= 0){
                  if(this.sortedReservations[s].bookID == issue.bookID){
                    for(let i = 0; i < this.allUsers.length; i++){
                      if(this.allUsers[i].username == this.sortedReservations[s].user){
                        let cnt = 0
                        let late = false
                        for(let j = 0; j < this.allIssues.length; j++){
                          if(this.allIssues[j].user == this.allUsers[i].username && this.allIssues[j].returned==false){
                            cnt++;
                          }
                          if(this.allIssues[j].user == this.allUsers[i].username && (new Date().getTime() > new Date(this.allIssues[j].deadlineDate).getTime()) && this.allIssues[j].returned == false){
                            late = true;
                          }
                        }
                        if(cnt == 3 || late){
                          continue
                        }
                        else{
                          this.resRemoved = this.sortedReservations[s]
                          resUser = this.allUsers[i]
                        }
                      }
                    }
                    if(resUser) break;
                    s--;
                  }
                  else s--;
                }
                if(resUser){
                  let resBook = null
                  for(let i = 0; i < this.allBooks.length; i++){
                    if(this.allBooks[i].bookID == issue.bookID){
                      resBook = this.allBooks[i]
                    }
                  }
                  this.issueService.add(issue.book, issue.bookID, resUser.username, false, this.issueID, this.issueDate, this.deadlineDate, resBook.author, resBook.picture).subscribe(respObj=>{
                    this.bookService.updateBook(resBook.bookID, resBook.title, resBook.author, resBook.genre, resBook.publisher, resBook.year, resBook.language, 0, resBook.picture).subscribe(resp=>{
                      if(respObj['message']=='ok'){
                        this.allExtensions.forEach(element => {
                          if(element.bookID == resBook.bookID && element.user == this.user.username){
                            this.toBeRemoved = element
                          }
                        });
                        if(this.toBeRemoved != null){
                          this.extensionService.remove(this.toBeRemoved.id).subscribe(resp=>{
                            this.extensionService.getAllExtensions().subscribe((e: Extension[])=>{
                              this.allExtensions = e;
                            })
                          })
                        }
                        if(this.resRemoved != null){
                          this.reservationService.remove(this.resRemoved.id).subscribe(resp=>{
                            this.reservationService.getAllReservations().subscribe((r: Reservation[])=>{
                              this.allReservations = r;
                              this.notifications.push("Knjiga " + issue.book + " je sada dostupna i nalazi se u vašim zaduženim knjigama!")
                              this.userService.updateNotifications(this.resRemoved.user, this.notifications).subscribe(resp5=>{
                                if(resp5['message']=='ok'){
                                }
                              })
                            })
                          })
                        }
                      }
                      window.location.reload();
                    })
                  })
                }
                else window.location.reload();
              }
            })
          }
        }
      }
    })
  }

  daysLeft(issue: Issue){
    return Math.floor((new Date(issue.deadlineDate).getTime() - new Date().getTime())/(86400000))
  }

  isDeadlinePassed(issue: Issue){
    return (new Date(issue.deadlineDate).getTime()/86400000 < new Date().getTime()/86400000)
  }

  deadlinePassed(issue: Issue){
    return Math.floor(-(new Date(issue.deadlineDate).getTime()/86400000 - new Date().getTime()/86400000))
  }

  extend(issue: Issue){
    this.extensionService.add(this.extensionID, issue.bookID, issue.user).subscribe(respObj=>{
      if(respObj['message']=="ok"){
        this.issueService.updateDeadline(issue.id, false, new Date(this.deadline * 86400 * 1000 + new Date(issue.deadlineDate).getTime())).subscribe(resp2=>{
          if(resp2['message']=='ok'){
            this.message = "Produžili ste rok"
            alert(this.message)
            window.location.reload()  
          }
        })
      }
      else{
        this.message = 'Error'
      }
    })
  }

  alreadyExtended(issue: Issue){
    let ret = 0
    this.allExtensions.forEach(element => {
      if(element.bookID == issue.bookID && element.user == issue.user){
        ret = 1
      }
    });
    return ret == 1
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
