import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { GraficoModel } from '../model/grafico';
import { UserService } from '../user.service';
import { IssueService } from '../issue.service';
import { Issue } from '../model/issue';
import { Book } from '../model/book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  List: Array<GraficoModel>;
  ListMonth: Array<GraficoModel>

  public Total=0;
  public MaxHeight= 160;

  constructor(private router: Router, private userService: UserService, private issueService: IssueService, private bookService: BooksService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.issueService.getAllIssues().subscribe((is: Issue[])=>{
      this.allIssues = is
      this.allIssues.forEach(element => {
        if(element.user == this.user.username && element.returned == true){
          this.graphIssues.push(element)
        }
      });
      this.bookService.getAllBooks().subscribe((b: Book[])=>{
        this.allBooks = b
        for(let i = 0; i < this.graphIssues.length; i++){
          for(let j = 0; j < this.allBooks.length; j++){
            if(this.graphIssues[i].bookID == this.allBooks[j].bookID){
              this.graphBooks.push(this.allBooks[j])
            }
          }
        }
        let cntFikcija = 0
        let cntRoman = 0
        let cntIstorijski = 0
        let cntDrama = 0
        let cntEpski = 0

        let cnt1 = 0
        let cnt2 = 0
        let cnt3 = 0
        let cnt4 = 0
        let cnt5 = 0
        let cnt6 = 0
        let cnt7 = 0
        let cnt8 = 0
        let cnt9 = 0
        let cnt10 = 0
        let cnt11 = 0
        let cnt12 = 0

        this.graphIssues.forEach(element => {
          if((new Date(element.returnDate).getMonth() + 1) == 1) cnt1++
          if((new Date(element.returnDate).getMonth() + 1) == 2) cnt2++
          if((new Date(element.returnDate).getMonth() + 1) == 3) cnt3++
          if((new Date(element.returnDate).getMonth() + 1) == 4) cnt4++
          if((new Date(element.returnDate).getMonth() + 1) == 5) cnt5++
          if((new Date(element.returnDate).getMonth() + 1) == 6) cnt6++
          if((new Date(element.returnDate).getMonth() + 1) == 7) cnt7++
          if((new Date(element.returnDate).getMonth() + 1) == 8) cnt8++
          if((new Date(element.returnDate).getMonth() + 1) == 9) cnt9++
          if((new Date(element.returnDate).getMonth() + 1) == 10) cnt10++
          if((new Date(element.returnDate).getMonth() + 1) == 11) cnt11++
          if((new Date(element.returnDate).getMonth() + 1) == 12) cnt12++
        });

        this.graphBooks.forEach(element => {
          if(element.genre.includes("Fikcija")) cntFikcija++;
          if(element.genre.includes("Roman")) cntRoman++;
          if(element.genre.includes("Istorijski")) cntIstorijski++;
          if(element.genre.includes("Drama")) cntDrama++;
          if(element.genre.includes("Epski")) cntEpski++;
        });
        
        this.List = [
          {Value: cntFikcija, Color:'#498B94', Size:'', Legend:'Fikcija'},
          {Value: cntRoman, Color:'#F8C622', Size:'', Legend:'Roman'},
          {Value: cntIstorijski, Color:'#747474', Size:'', Legend:'Istorijski'},
          {Value: cntEpski, Color:'#EC972D', Size:'', Legend:'Epski'},
          {Value: cntDrama, Color:'#EC972D', Size:'', Legend:'Drama'}
        ];

        this.ListMonth = [
          {Value: cnt1, Color:'#EC972D', Size:'', Legend:'Januar'},
          {Value: cnt2, Color:'#EC972D', Size:'', Legend:'Februar'},
          {Value: cnt3, Color:'#EC972D', Size:'', Legend:'Mart'},
          {Value: cnt4, Color:'#EC972D', Size:'', Legend:'April'},
          {Value: cnt5, Color:'#EC972D', Size:'', Legend:'Maj'},
          {Value: cnt6, Color:'#EC972D', Size:'', Legend:'Jun'},
          {Value: cnt7, Color:'#EC972D', Size:'', Legend:'Jul'},
          {Value: cnt8, Color:'#EC972D', Size:'', Legend:'Avgust'},
          {Value: cnt9, Color:'#EC972D', Size:'', Legend:'Septembar'},
          {Value: cnt10, Color:'#EC972D', Size:'', Legend:'Oktobar'},
          {Value: cnt11, Color:'#EC972D', Size:'', Legend:'Novembar'},
          {Value: cnt12, Color:'#EC972D', Size:'', Legend:'Decembar'}
        ];
        
        this.MontarGrafico();
      })
    })
    
  }

  allBooks: Book[] = []
  graphBooks: Book[] = []
  graphIssues: Issue[] = []
  allIssues: Issue[] = []
  user: User

  getToChangePassword(){
    this.router.navigate(['change-password'])
  }

  getToUpdateUser(){
    this.router.navigate(['update-user'])
  }

  MontarGrafico(){
    this.List.forEach(element => {
      this.Total += element.Value;
    });

    this.List.forEach(element => {
      element.Size = Math.round((element.Value*this.MaxHeight)/this.Total) + '%';
    });


    this.ListMonth.forEach(element => {
      this.Total += element.Value;
    });

    this.ListMonth.forEach(element => {
      element.Size = Math.round((element.Value*this.MaxHeight)/this.Total) + '%';
    });
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
