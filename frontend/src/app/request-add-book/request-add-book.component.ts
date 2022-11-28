import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';

@Component({
  selector: 'app-request-add-book',
  templateUrl: './request-add-book.component.html',
  styleUrls: ['./request-add-book.component.css']
})
export class RequestAddBookComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer, private router: Router, private bookService: BooksService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.bookService.getAllBookRequests().subscribe((data: Book[])=>{
      this.allBooks = data
      this.sortedPendingBooks = this.bookService.sortBooksByID(this.allBooks)
      if(this.sortedPendingBooks.length == 0){
        this.id = 1
      }
      else{
        this.maxID = this.sortedPendingBooks[0].bookID
        this.id = this.maxID + 1;
      }
      this.adder = this.user.username
    })
  }

  maxID: number
  sortedPendingBooks: Book[] = []
  allBooks: Book[] = []
  user: User
  id: number
  title: string
  author: string
  genre: string
  publisher: string
  year: string
  language: string
  picture: string
  saved: boolean
  message: string
  adder: string
  genreList: string[] = ['Fikcija', 'Roman', 'Drama', 'Istorijski', 'Epski'];
  genresToAdd: string[] = []

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

  add(){
    this.genre = ""
    this.genresToAdd.forEach(element => {
      this.genre += (element + " ")
    });
    if(this.picture == null){
      this.picture = 'data:image/jpeg;base64,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'
    }
    this.bookService.addMod(this.adder ,this.id, this.title, this.author, this.genre, this.publisher, this.year, this.language, this.picture).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Vaš zahtjev za registraciju je uspješno prihvaćen'
        alert(this.message)
        this.router.navigate(['front-page'])
      }
      else{
        this.message = 'Error'
      }
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
