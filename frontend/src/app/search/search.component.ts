import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import {FormControl} from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.bookService.getAllBooks().subscribe((books: Book[])=>{
      this.allBooks = books
    })
  }

  genreFormControl = new FormControl('');

  genreList: string[] = ['Fikcija', 'Roman', 'Drama', 'Istorijski', 'Epski'];
  user: User
  allBooks: Book[] = []
  searchGenres: string[] = []
  searchParam: string
  searchedBooks: Book[] = []
  selected: boolean
  yearFrom: number
  yearTo: number
  publisher: string

  search(){

    let inputArrayParam: string[] = this.searchParam.split(" ");

    this.searchedBooks = []
    
    this.allBooks.forEach(element => {
      let allIncluded = true;
      inputArrayParam.forEach(el => {
        let titleAuthors: string = element.title.toLowerCase() + " "  + element.author.toLowerCase()
        if(!titleAuthors.includes(el.toLowerCase())){
          allIncluded = false;
        }
      })
      if(allIncluded)
      this.searchedBooks.push(element)
      
    })
  }

  advancedSearch(){
    if(this.searchParam == null) this.searchParam = ""
    let inputArrayParam: string[] = this.searchParam.split(" ");
    let genreParam = ""

    this.searchGenres.forEach(element => {
      genreParam += (element + " ")
    });

    let genreArrayParam: string[] = genreParam.split(" ")

    this.searchedBooks = []
    
    this.allBooks.forEach(e1 => {
      let allIncluded = true;
      inputArrayParam.forEach(e2 => {
        let titleAuthors: string = e1.title.toLowerCase() + " "  + e1.author.toLowerCase()
        if(!titleAuthors.includes(e2.toLowerCase())){
          allIncluded = false;
        }
      })
      if(allIncluded){
        
        let genreIncluded = false;
        genreArrayParam.forEach(e4 => {
          if(e1.genre.toLowerCase().includes(e4.toLowerCase()) && e4 != ""){
            genreIncluded = true;
          }
        })
        if(genreIncluded || genreParam.length == 0){
          if(this.yearFrom == null && this.yearTo == null){
            if(this.publisher != null){
              if(e1.publisher.includes(this.publisher)){
                this.searchedBooks.push(e1)
              }
            }
            else{
              this.searchedBooks.push(e1)
            }
          }
          else if(this.yearFrom == null && e1.year <= this.yearTo.toString()){
            if(this.publisher != null){
              if(e1.publisher.includes(this.publisher)){
                this.searchedBooks.push(e1)
              }
            }
            else{
              this.searchedBooks.push(e1)
            }
          }
          else if(this.yearTo == null && e1.year >= this.yearFrom.toString()){
            if(this.publisher != null){
              if(e1.publisher.includes(this.publisher)){
                this.searchedBooks.push(e1)
              }
            }
            else{
              this.searchedBooks.push(e1)
            }
          }
          else if(e1.year >= this.yearFrom.toString() && e1.year <= this.yearTo.toString()){
            if(this.publisher != null){
              if(e1.publisher.includes(this.publisher)){
                this.searchedBooks.push(e1)
              }
            }
            else{
              this.searchedBooks.push(e1)
            }
          }
        }

      }
    })


  }

  getToBook(b: Book){
    sessionStorage.setItem('bookID', JSON.stringify(b.bookID))
    this.router.navigate(['books'])
  }

  start(){
    if(this.user == null){
      this.router.navigate([""])
    } else{
      if(this.user.type == 1){
        this.router.navigate(["mod"])
      }
      else if(this.user.type == 2){
        this.router.navigate(["admin"])
      }
      else this.router.navigate(["front-page"])
    }
  }

}
