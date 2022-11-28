import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.emailID = this.user.email
  }

  user: User

  emailID: string
  username: string
  firstname: string
  lastname: string
  address: string
  phone: string
  email: string
  picture: string
  saved: boolean
  message: string

  addPicture(fileInput: any) {
    this.picture = null
    this.saved = false
    if (fileInput.target.files && fileInput.target.files[0]) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          const imgBase64Path = e.target.result;
          this.picture = imgBase64Path;
          this.saved = true;
          return true
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  picturePath() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.picture)
  }

  updateUser(){
    if(this.picture != null){
      this.user.picture = this.picture
    }  
    this.userService.updateUser(this.emailID, this.user.firstname, this.user.lastname, this.user.username, this.user.address, this.user.phone, this.user.email, this.picture).subscribe(resp=>{
      alert(resp['message'])
      sessionStorage.setItem('user', JSON.stringify(this.user))
      this.router.navigate(['profile'])
    })
  }
}
