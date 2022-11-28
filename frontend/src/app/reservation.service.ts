import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from './model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllReservations(){
    return this.http.get(`${this.uri}/reservations/getAllReservations`)
  }

  add(id, bookID, user){
    const data = {
      id: id,
      bookID: bookID,
      user: user
    }

    return this.http.post(`${this.uri}/reservations/add`, data)
  }

  sortReservationsByID(allReservations: Reservation[]): Reservation[]{
    return allReservations.sort((res1, res2)=>{
      if(res1.id>res2.id){
        return -1;
      }
      else{
        if(res1.id == res2.id){
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

    return this.http.post(`${this.uri}/reservations/remove`, data)
  }
}
