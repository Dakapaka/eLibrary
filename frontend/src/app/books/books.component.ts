import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CommentService } from '../comment.service';
import { ExtensionService } from '../extension.service';
import { IssueService } from '../issue.service';
import { Book } from '../model/book';
import { Comment } from '../model/comment';
import { Extension } from '../model/extension';
import { Issue } from '../model/issue';
import { Reservation } from '../model/reservation';
import { User } from '../model/user';
import { ReservationService } from '../reservation.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private bookService : BooksService, private router: Router, private issueService: IssueService, private userService: UserService, private commentService: CommentService, private extensionService: ExtensionService, private reservationService: ReservationService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.bookID = JSON.parse(sessionStorage.getItem('bookID'))
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.deadline = JSON.parse(sessionStorage.getItem('deadline'))
    this.issueDate = new Date()

    this.clicked = false
    this.issueService.getAllIssues().subscribe((data: Issue[])=>{
      this.allIssues = data
       
      this.sortedIssues = this.issueService.sortIssuesById(this.allIssues)
      if(this.sortedIssues.length == 0){
        this.issueID = 1
      }
      else{
        this.maxID = this.sortedIssues[0].id
        this.issueID = this.maxID + 1;
      }
      this.userService.getAllUsers().subscribe((d: User[])=>{
        this.allUsers = d
        this.allUsers.forEach(element => {
          if(element.username == "admin"){
            this.admin = element
          }
        });
        this.deadline = this.admin.deadline
        this.deadlineDate = new Date(this.issueDate.getTime() + this.deadline * 86400 * 1000)
        this.bookService.getAllBooks().subscribe((da: Book[])=>{
          this.allBooks = da
          this.allBooks.forEach(element => {
            if(element.bookID == this.bookID){
              this.book = element
            }
          });
          this.commentService.getAllComments().subscribe((comments: Comment[])=>{
            this.allComments = comments
            this.sortedComments = this.commentService.sortCommentsByID(this.allComments)
            if(this.sortedComments.length == 0){
              this.commID = 1;
            }
            else{
              this.maxCommID = this.sortedComments[0].id
              this.commID = this.maxCommID + 1
            }
            this.allComments.forEach(element => {
              if(element.bookID == this.book.bookID){
                this.showComments.push(element)
              }
            });
            let s = 0
            this.showComments.forEach(element => {
              s += element.rating
            });
            if(this.showComments.length == 0){
              this.showRating = 0
            }
            else{
              this.showRating = s / this.showComments.length
            }
            this.reservationService.getAllReservations().subscribe((reservations: Reservation[])=>{
              this.allReservations = reservations
              this.sortedReservations = this.reservationService.sortReservationsByID(this.allReservations)
              if(this.sortedReservations.length == 0){
                this.resID = 1;
              }
              else{
                this.maxResID = this.sortedReservations[0].id
                this.resID = this.maxResID + 1
              }
              this.extensionService.getAllExtensions().subscribe((exts: Extension[])=>{
                this.allExtensions = exts
              })
            })
          })
        })
      })
    })
  }

  maxResID: number
  resID: number
  sortedReservations: Reservation[] = []
  allReservations: Reservation[] = []
  showRating: number
  toBeRemoved: Extension
  allExtensions: Extension[] = []
  showComments: Comment[] = []
  commID: number
  maxCommID: number
  sortedComments: Comment[] = []
  commentRating: number
  allComments: Comment[] = []
  allBooks: Book[] = []
  allUsers: User[] = []
  issueID: number
  maxID: number
  sortedIssues: Issue[] = []
  user: User
  bookID: number
  book: Book
  id: number
  title: string
  author: string
  genre: string
  publisher: string
  year: string
  language: string
  clicked: boolean
  inventory: number
  allIssues: Issue[] = []
  message: string
  alreadyIssued: Issue[] = []
  issued: Issue[]=[]
  issueDate: Date
  deadline: number
  deadlineDate: Date
  admin: User
  rating: number
  comment: string
  updateComment: string
  updateSelected: boolean
  updateRating: number
  notifications: string[][] = []
  resRemoved: Reservation[] = []
  resUsers: User[] = []
  picture: string
  saved: boolean

  addPicture(fileInput: any) {
    this.picture = null
    this.saved = false
    if (fileInput.target.files && fileInput.target.files[0]) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          const imgBase64Path = e.target.result;
          this.picture = imgBase64Path;
          this.saved = true;
          return true
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  picturePath() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.picture)
  }

  updateBook(){
    if(this.picture != null){
      this.book.picture = this.picture
    }
    this.bookService.updateBook(this.book.bookID, this.book.title, this.book.author, this.book.genre, this.book.publisher, this.book.year, this.book.language, this.book.inventory, this.picture).subscribe(resp=>{
      alert(resp['message'])
      sessionStorage.setItem('book', JSON.stringify(this.book))
      let s = this.sortedReservations.length - 1
      while(s >= 0){
        if(this.sortedReservations[s].bookID == this.book.bookID){
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
                this.resRemoved.push(this.sortedReservations[s])
                this.resUsers.push(this.allUsers[i])
              }
            }
          }
          s--;
        }
        else s--;
      }
      if(this.resUsers.length != 0){
        let resBook = null
        for(let i = 0; i < this.allBooks.length; i++){
          if(this.allBooks[i].bookID == this.book.bookID){
            resBook = this.allBooks[i]
          }
        }
        for(let p = 0; p < this.resUsers.length; p++){
          this.issueService.add(this.book.title, this.book.bookID, this.resUsers[p].username, false, this.issueID + p, this.issueDate, this.deadlineDate, resBook.author, resBook.picture).subscribe(respObj=>{
            this.bookService.updateBook(resBook.bookID, resBook.title, resBook.author, resBook.genre, resBook.publisher, resBook.year, resBook.language, this.book.inventory - this.resUsers.length, resBook.picture).subscribe(resp=>{
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
                  this.reservationService.remove(this.resRemoved[p].id).subscribe(resp=>{
                    this.reservationService.getAllReservations().subscribe((r: Reservation[])=>{
                      this.allReservations = r;
                      this.notifications[p].push("Knjiga " + this.book.title + " je sada dostupna i nalazi se u vašim zaduženim knjigama!")
                      this.userService.updateNotifications(this.resRemoved[p].user, this.notifications[p]).subscribe(resp5=>{
                        if(resp5['message']=='ok' && p == this.resUsers.length - 1){
                          window.location.reload();
                        }
                      })
                    })
                  })
                }
              }
            })
          })
        }
      }
    })
  }

  isClicked(){
    if(this.clicked == false) this.clicked = true
    else this.clicked = false
  }

  issue(){
    if(this.allIssues.length != 0){
      this.allIssues.forEach(element => {
        if((element.user == this.user.username) && (element.bookID == this.book.bookID) && (element.returned == false)){
          this.alreadyIssued.push(element)
        }
      });
      this.allIssues.forEach(e => {
        if(e.user == this.user.username){
          this.issued.push(e)
        }
      });
  
      if(this.issued.length == 3 && this.issued[0].returned==false && this.issued[1].returned==false && this.issued[2].returned==false){
        this.message = "Na maksimumu ste dozvoljenih zaduženja"
        alert(this.message)
        this.router.navigate(['front-page'])
      }
  
      else{
        if(this.alreadyIssued.length == 0 && this.book.inventory >= 1){
          this.issueService.add(this.book.title, this.book.bookID, this.user.username, false, this.issueID, this.issueDate, this.deadlineDate, this.book.author, this.book.picture).subscribe(respObj=>{
            this.bookService.updateBook(this.book.bookID, this.book.title, this.book.author, this.book.genre, this.book.publisher, this.book.year, this.book.language, this.book.inventory - 1, this.book.picture).subscribe(resp=>{
              if(respObj['message']=='ok'){
                this.allExtensions.forEach(element => {
                  if(element.bookID == this.book.bookID && element.user == this.user.username){
                    this.toBeRemoved = element
                  }
                });
                if(this.toBeRemoved != null){
                  this.extensionService.remove(this.toBeRemoved.id).subscribe(resp=>{
                    this.extensionService.getAllExtensions().subscribe((data: Extension[])=>{
                      this.allExtensions = data;
                    })
                  })
                }
                this.message = 'Uspješno ste zadužili knjigu'
                alert(this.message)
                this.router.navigate(['front-page'])
              }
              else{
                this.message = 'Nijeste zadužili knjigu'
              }
            })
          })
        }
      }
    }
    else{
      this.issueService.add(this.book.title, this.book.bookID, this.user.username, false, this.issueID, this.issueDate, this.deadlineDate, this.book.author, this.book.picture).subscribe(respObj=>{
        this.bookService.updateBook(this.book.bookID, this.book.title, this.book.author, this.book.genre, this.book.publisher, this.book.year, this.book.language, this.book.inventory - 1, this.book.picture).subscribe(resp=>{
          if(respObj['message']=='ok'){
            this.allExtensions.forEach(element => {
              if(element.bookID == this.book.bookID && element.user == this.user.username){
                this.toBeRemoved = element
              }
            });
            if(this.toBeRemoved != null){
              this.extensionService.remove(this.toBeRemoved.id).subscribe(resp=>{
                this.extensionService.getAllExtensions().subscribe((data: Extension[])=>{
                  this.allExtensions = data;
                })
              })
            }
            this.message = 'Uspješno ste zadužili knjigu'
            alert(this.message)
            this.router.navigate(['front-page'])
          }
          else{
            this.message = 'Nijeste zadužili knjigu'
          }
        })
      })
    }
  }

  addComment(){
    let tmp = 0
    this.allComments.forEach(element => {
      if(element.user == this.user.username && element.bookID == this.book.bookID){
        tmp = 1;
        this.message = 'Već ste ocijenili ovu knjigu'
        alert(this.message)
        window.location.reload()
      }
    });
    if(tmp == 0){
      this.commentService.addComment(this.book.bookID, this.user.username, this.commID, this.comment, this.commentRating, new Date()).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          if(this.book.rating == null){
            this.book.rating = 0;
          }
          this.bookService.updateRating(this.book.bookID, (this.book.rating * this.showComments.length + this.commentRating)/(this.showComments.length + 1)).subscribe(resp=>{
            if(resp['message']=='ok'){
              this.message = "Komentar dodat"
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
  }

  dateToString(date: Date){
    return "" + new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate() + " " + new Date(date).getHours() + ":" + new Date(date).getMinutes() + ":" + new Date(date).getSeconds()
  }

  update(comment: Comment){
    this.commentService.updateComment(comment.id, this.updateComment, this.updateRating, true).subscribe(resp=>{
      let s = 0
      for(let i = 0; i < this.showComments.length; i++){
        if(this.showComments[i].id != comment.id){
          s+=this.showComments[i].rating
        }
      }
      s+=this.updateRating
      let newRating = s/this.showComments.length
      this.bookService.updateRating(this.book.bookID, newRating).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = "Komentar ažuriran"
          alert(this.message)
          window.location.reload()
        }
      })
    })
  }

  showReserve(){
    let temp = 0
    this.allIssues.forEach(element => {
      if(element.user == this.user.username && element.bookID == this.book.bookID && element.returned == false){
        temp = 1;
      }
    });
    if(temp == 0 && this.book.inventory == 0){
      return true
    }
    else return false
  }

  reserve(){
    this.reservationService.add(this.resID, this.book.bookID, this.user.username).subscribe(respObj=>{
      if(respObj['message']=="ok"){
        this.message = "Rezervisali ste knjigu"
        alert(this.message)
        window.location.reload()
      }
      else{
        this.message = 'Error'
      }
    })
  }

  hasThisBook(){
    let has = false;
    this.allIssues.forEach(element => {
      if(element.user == this.user.username && element.returned == false){
        has = true;
      }
    });
    return has
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
