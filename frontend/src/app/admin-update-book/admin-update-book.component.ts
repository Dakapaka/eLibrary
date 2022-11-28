import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-admin-update-book',
  templateUrl: './admin-update-book.component.html',
  styleUrls: ['./admin-update-book.component.css']
})
export class AdminUpdateBookComponent implements OnInit {

  constructor(private bookService: BooksService, private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.book = JSON.parse(sessionStorage.getItem('admin-book'))
    this.id = this.book.bookID
  }

  book: Book

  id: number
  title: string
  author: string
  genre: string
  publisher: string
  year: string
  language: string
  inventory: number
  picture: string
  saved: boolean
  message: string

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
      this.router.navigate(['admin-books'])
    })
  }

}
