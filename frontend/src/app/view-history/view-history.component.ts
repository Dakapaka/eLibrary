import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { Issue } from '../model/issue';
import { User } from '../model/user';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit(): void {
    this.issueDateSorted = false;
    this.titleSorted = false;
    this.deadlineSorted = false;
    this.authorSorted = false;
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.issueService.getAllIssues().subscribe((data: Issue[])=>{
      this.allIssues = data
      this.allIssues.forEach(element => {
        if(element.user == this.user.username && element.returned == true){
          this.showIssues.push(element)
        }
      });
    })
  }

  user: User
  allIssues: Issue[] = []
  showIssues: Issue[] = []
  issueDateSorted: boolean
  deadlineSorted: boolean
  titleSorted: boolean
  authorSorted: boolean

  dateToString(date: Date){
    return "" + new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate()
  }

  getToBook(b: Issue){
    sessionStorage.setItem('bookID', JSON.stringify(b.bookID))
    this.router.navigate(['books'])
  }

  sortByIssueDate(allIssues: Issue[]){
    if(this.issueDateSorted == false){
      return allIssues.sort((issue1, issue2)=>{
        if(new Date(issue1.issueDate).getTime()>new Date(issue2.issueDate).getTime()){
          this.issueDateSorted = true;
          return -1;
        }
        else{
          if(new Date(issue1.issueDate).getTime()==new Date(issue2.issueDate).getTime()){
            this.issueDateSorted = true;
            return 0;
          }
          else{
            this.issueDateSorted = true;
            return 1
          } 
        }
      })
    }
    else{
      return allIssues.sort((issue1, issue2)=>{
        if(new Date(issue1.issueDate).getTime()<new Date(issue2.issueDate).getTime()){
          this.issueDateSorted = false;
          return -1;
        }
        else{
          if(new Date(issue1.issueDate).getTime()==new Date(issue2.issueDate).getTime()){
            this.issueDateSorted = false;
            return 0;
          }
          else{
            this.issueDateSorted = false;
            return 1
          } 
        }
      })
    }
  }
  
  sortByDeadlineDate(allIssues: Issue[]){
    if(this.deadlineSorted == false){
      return allIssues.sort((issue1, issue2)=>{
        if(new Date(issue1.returnDate).getTime()>new Date(issue2.returnDate).getTime()){
          this.deadlineSorted = true;
          return -1;
        }
        else{
          if(new Date(issue1.returnDate).getTime()==new Date(issue2.returnDate).getTime()){
            this.deadlineSorted = true;
            return 0;
          }
          else{
            this.deadlineSorted = true;
            return 1
          } 
        }
      })
    }
    else{
      return allIssues.sort((issue1, issue2)=>{
        if(new Date(issue1.returnDate).getTime()<new Date(issue2.returnDate).getTime()){
          this.deadlineSorted = false;
          return -1;
        }
        else{
          if(new Date(issue1.returnDate).getTime()==new Date(issue2.returnDate).getTime()){
            this.deadlineSorted = false;
            return 0;
          }
          else{
            this.deadlineSorted = false;
            return 1
          } 
        }
      })
    }
  }

  sortByTitle(allIssues: Issue[]){
    if(this.titleSorted == false){
      return allIssues.sort((issue1, issue2)=>{
        if(issue1.book>issue2.book){
          this.titleSorted = true;
          return -1;
        }
        else{
          if(issue1.book==issue2.book){
            this.titleSorted = true;
            return 0;
          }
          else{
            this.titleSorted = true;
            return 1
          } 
        }
      })
    }
    else{
      return allIssues.sort((issue1, issue2)=>{
        if(issue1.book<issue2.book){
          this.titleSorted = false;
          return -1;
        }
        else{
          if(issue1.book==issue2.book){
            this.titleSorted = false;
            return 0;
          }
          else{
            this.titleSorted = false;
            return 1
          } 
        }
      })
    }
  }

  sortByAuthor(allIssues: Issue[]){
    if(this.authorSorted == false){
      return allIssues.sort((issue1, issue2)=>{
        if(issue1.book>issue2.book){
          this.authorSorted = true;
          return -1;
        }
        else{
          if(issue1.book==issue2.book){
            this.authorSorted = true;
            return 0;
          }
          else{
            this.authorSorted = true;
            return 1
          } 
        }
      })
    }
    else{
      return allIssues.sort((issue1, issue2)=>{
        if(issue1.book<issue2.book){
          this.authorSorted = false;
          return -1;
        }
        else{
          if(issue1.book==issue2.book){
            this.authorSorted = false;
            return 0;
          }
          else{
            this.authorSorted = false;
            return 1
          } 
        }
      })
    }
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
