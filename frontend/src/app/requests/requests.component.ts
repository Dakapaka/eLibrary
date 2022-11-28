import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUserRequests().subscribe((data: User[])=>{
      this.userRequests = data
    })
  }

  userRequests: User[] = []
  message: string

  accept(user: User){
    this.userService.register(user.firstname, user.lastname, user.username, user.password, user.address, user.phone, user.email, user.picture).subscribe(respObj=>{
      if(respObj['message']=='ok'){

      }
      else{
        this.message = 'Error'
      }
    })
    this.userService.delete(user.email).subscribe(resp=>{
      alert(resp['message'])
      this.userService.getAllUserRequests().subscribe((data: User[])=>{
        this.userRequests = data;
        this.router.navigate(['admin'])
      })
    })
  }

  reject(user: User){
    this.userService.delete(user.email).subscribe(resp=>{
      alert(resp['message'])
      this.userService.getAllUserRequests().subscribe((data: User[])=>{
        this.userRequests = data;
        this.router.navigate(['admin'])
      })
    })
  }

  front(){
    this.router.navigate(["admin"])
  }

}
