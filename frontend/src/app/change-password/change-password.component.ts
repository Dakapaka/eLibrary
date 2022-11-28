import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.email = this.user.email
  }

  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
  email: string
  message: string;
  user: User

  changePassword(email, oldPassword, newPassword1, newPassword2){
    console.log(email)
    let x = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{8,12}$/
    if (x.test(this.newPassword1) && /^[a-zA-Z]/.test(this.newPassword1)){
      if(oldPassword == this.user.password){
        if(newPassword1 == newPassword2){
          this.userService.changePassword(this.email, this.oldPassword, this.newPassword1, this.newPassword2).subscribe(resp=>{
            alert(resp['message'])
            sessionStorage.clear()
            this.router.navigate([''])
          })
        }else{
          this.message = 'Lozinke se ne podudaraju'
          alert(this.message)
          window.location.reload()
        }
      }else{
        this.message = 'Pogresna stara lozinka'
        alert(this.message)
        window.location.reload()
      }
    }else{
      this.message = "Pogrešan format lozinke, pokušajte ponovo"
      alert(this.message)
      window.location.reload()
    }
  }

}
