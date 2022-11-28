import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from './model/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllIssues(){
    return this.http.get(`${this.uri}/issues/getAllIssues`)
  }

  add(book, bookID, user, returned, id, issueDate, deadlineDate, author, picture){
    const data = {
      user: user,
      bookID: bookID,
      book: book,
      returned: returned,
      id: id,
      issueDate: issueDate,
      deadlineDate: deadlineDate,
      author: author,
      picture: picture
    }

    return this.http.post(`${this.uri}/issues/add`, data)
  }

  updateIssue(user, bookID, book, returned, id, returnDate){
    const data = {
      bookID: bookID,
      book: book,
      user: user,
      returned: returned,
      id: id,
      returnDate: returnDate
    }

    return this.http.post(`${this.uri}/issues/updateIssue`, data)
  }

  sortIssuesById(allIssues: Issue[]){
    return allIssues.sort((iss1, iss2)=>{
      if(iss1.id>iss2.id){
        return -1;
      }
      else{
        if(iss1.id == iss2.id){
          return 0;
        }
        else return 1;
      }
    })
  }

  updateDeadline(id, returned, deadlineDate){
    const data = {
      id: id,
      returned: returned,
      deadlineDate: deadlineDate
    }

    return this.http.post(`${this.uri}/issues/updateDeadline`, data)
  }

  
}
