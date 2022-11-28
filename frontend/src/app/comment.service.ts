import { HttpClient } from '@angular/common/http';
import { Comment } from './model/comment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllComments(){
    return this.http.get(`${this.uri}/comments/getAllComments`)
  }

  addComment(bookID, user, id, text, rating, date){
    const data = {
      user: user,
      bookID: bookID,
      text: text,
      rating: rating,
      date: date,
      id: id,
    }

    return this.http.post(`${this.uri}/comments/addComment`, data)
  }

  sortCommentsByID(allBooks: Comment[]): Comment[]{
    return allBooks.sort((comm1, comm2)=>{
      if(comm1.id>comm2.id){
        return -1;
      }
      else{
        if(comm1.id==comm2.id){
          return 0;
        }
        else return 1;
      }
    })
  }

  updateComment(id, text, rating, updated){
    const data = {
      id: id,
      text: text,
      rating: rating,
      updated: updated
    }

    return this.http.post(`${this.uri}/comments/updateComment`, data)
  }
}
