import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extension } from './model/extension';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllExtensions(){
    return this.http.get(`${this.uri}/extensions/getAllExtensions`)
  }

  add(id, bookID, user){
    const data = {
      id: id,
      bookID: bookID,
      user: user
    }

    return this.http.post(`${this.uri}/extensions/add`, data)
  }

  sortExtensions(allExtensions: Extension[]): Extension[]{
    return allExtensions.sort((ext1, ext2)=>{
      if(ext1.id>ext2.id){
        return -1;
      }
      else{
        if(ext1.id == ext2.id){
          return 0;
        }
        else return 1;
      }
    })
  }

  remove(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/extensions/remove`, data)
  }
}
