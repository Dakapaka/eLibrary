import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './model/book';
'./model/book'
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllBooks(){
    return this.http.get(`${this.uri}/books/getAllBooks`)
  }

  getAllBookRequests(){
    return this.http.get(`${this.uri}/booksPending/getAllBookRequests`)
  }

  searchBooks(searchParam){
    return this.http.get(`${this.uri}/books/searchBooks?param=${searchParam}`)
  }

  updateBook(id, title, author, genre, publisher, year, language, inventory, picture){
    const data = {
      id: id,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher, 
      year: year,
      language: language,
      inventory: inventory,
      picture: picture
    }

    return this.http.post(`${this.uri}/books/updateBook`, data)
  }

  add(id, title, author, genre, publisher, year, language, picture){
    const data = {
      id: id,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher, 
      year: year,
      language: language,
      picture: picture
    }

    return this.http.post(`${this.uri}/books/add`, data)
  }

  sortBooksByTimesTaken(allBooks: Book[]): Book[]{
    return allBooks.sort((book1, book2)=>{
      if(book1.timesTaken>book2.timesTaken){
        return -1;
      }
      else{
        if(book1.timesTaken == book2.timesTaken){
          return 0;
        }
        else return 1;
      }
    })
  }

  addMod(adder, id, title, author, genre, publisher, year, language, picture){
    const data = {
      adder: adder,
      id: id,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher, 
      year: year,
      language: language,
      picture: picture
    }

    return this.http.post(`${this.uri}/booksPending/add`, data)
  }

  delete(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/booksPending/delete`, data)
  }

  sortBookRequestsByID(allBooks: Book[]){
    return allBooks.sort((book1, book2)=>{
      if(book1.bookID>book2.bookID){
        return -1;
      }
      else{
        if(book1.bookID == book2.bookID){
          return 0;
        }
        else return 1;
      }
    })
  }

  sortBooksByID(allBooks: Book[]){
    return allBooks.sort((book1, book2)=>{
      if(book1.bookID>book2.bookID){
        return -1;
      }
      else{
        if(book1.bookID == book2.bookID){
          return 0;
        }
        else return 1;
      }
    })
  }
  
  updateRating(id, rating){
    const data = {
      id: id,
      rating: rating
    }

    return this.http.post(`${this.uri}/books/updateRating`, data)
  }

  remove(bookID){
    const data = {
      bookID: bookID
    }

    return this.http.post(`${this.uri}/books/remove`, data)
  }
}
