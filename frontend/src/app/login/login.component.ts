import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string
  password: string
  message: string
  logged: boolean

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        if(userFromDB.type == 0){
          this.router.navigate(['front-page'])
          logged: true;
        }
        else if(userFromDB.type == 1){
          this.router.navigate(['mod'])
          logged: true;
        }
        else if(userFromDB.type == 2){
          this.router.navigate(['admin'])
        }
        else{
          this.message = 'Unijeli ste pogrešne podatke'
          logged: false;
        } 
        sessionStorage.setItem('user', JSON.stringify(userFromDB))
      }
      else {
        this.message = 'Unijeli ste pogrešne podatke'
        logged: false;
      }
    })
  }

  start(){
    this.router.navigate([""])
  }

}
