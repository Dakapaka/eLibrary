import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  user: User
  username: string
  password: string
  message: string

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        if(userFromDB.type != 2){
          this.message = "Nemate pravo pristupa!"
        }
        else{
          sessionStorage.setItem('user', JSON.stringify(userFromDB))
          this.router.navigate(['admin'])
        }
      }
    })
  }
}
