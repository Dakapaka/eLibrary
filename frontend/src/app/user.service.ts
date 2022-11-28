import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameForm, passwordForm){
    const data = {
      username: usernameForm,
      password: passwordForm
    }
    return this.http.post(`${this.uri}/users/login`, data)
  }

  changePassword(email, oldPassword, newPassword1, newPassword2){
    const data = {
      email: email,
      oldPassword: oldPassword,
      newPassword1: newPassword1,
      newPassword2: newPassword2
    }

    return this.http.post(`${this.uri}/users/updatePassword`, data)
  }

  register(firstname, lastname, username, password, address, phone, email, picture){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username, 
      password: password,
      address: address,
      phone: phone,
      email: email,
      picture: picture
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }

  registerAdmin(firstname, lastname, username, password, address, phone, email, picture){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username, 
      password: password,
      address: address,
      phone: phone,
      email: email,
      picture: picture
    }

    return this.http.post(`${this.uri}/usersPending/register`, data)
  }

  updateAdmin(email, deadline){
    const data = {
      email: email,
      deadline: deadline
    }

    return this.http.post(`${this.uri}/users/updateAdmin`, data)
  }

  updateUser(emailID, firstname, lastname, username, address, phone, email, picture){
    const data = {
      emailID: emailID,
      firstname: firstname,
      lastname: lastname,
      username: username, 
      address: address,
      phone: phone,
      email: email,
      picture: picture
    }

    return this.http.post(`${this.uri}/users/updateUser`, data)
  }

  updatePrivileges(email, type){
    const data = {
      email: email,
      type: type
    }

    return this.http.post(`${this.uri}/users/updatePrivileges`, data)
  }

  getAllUserRequests(){
    return this.http.get(`${this.uri}/usersPending/getAllUserRequests`)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`)
  }

  remove(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/users/remove`, data)
  }

  delete(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/usersPending/delete`, data)
  }

  setBlocked(email, blocked){
    const data = {
      email: email,
      blocked: blocked
    }

    return this.http.post(`${this.uri}/users/setBlocked`, data)
  }

  setExtended(user, extended){
    const data = {
      user: user,
      extended: extended
    }

    return this.http.post(`${this.uri}/users/setExtended`, data)
  }

  setBookAdded(user, bookAdded){
    const data = {
      user: user,
      bookAdded: bookAdded
    }

    return this.http.post(`${this.uri}/users/setBookAdded`, data)
  }

  updateNotifications(user, notifications){
    const data = {
      user: user,
      notifications: notifications
    }

    return this.http.post(`${this.uri}/users/updateNotifications`, data)
  }

  updateBooksAdded(user, booksAdded){
    const data = {
      user: user,
      booksAdded: booksAdded
    }

    return this.http.post(`${this.uri}/users/updateBooksAdded`, data)
  }
}
