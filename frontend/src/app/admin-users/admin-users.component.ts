import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { Issue } from '../model/issue';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private issueService: IssueService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.userService.getAllUsers().subscribe((data: User[])=>{
      this.allUsers = data
      this.issueService.getAllIssues().subscribe((d: Issue[])=>{
        this.allIssues = d
      })
    })
  }

  user: User
  allUsers: User[] = []
  allIssues: Issue[] = []
  message: string

  getToUpdateUser(user: User){
    sessionStorage.setItem('admin-user', JSON.stringify(user))
    this.router.navigate(['admin-update-user'])
  }

  delete(user: User){
    let hasIssued = false
    this.allIssues.forEach(element => {
      if(element.user == user.username && element.returned == false){
        this.message = "Korisnik ima zaduženih knjiga"
        hasIssued = true;
      }
    });
    if(hasIssued){
      alert(this.message)
    }else{
      this.userService.remove(user.email).subscribe(resp=>{
        this.userService.getAllUsers().subscribe((data: User[])=>{
          this.allUsers = data;
          window.location.reload()
        })
      })
    }
  }

  chanegPrivileges(user: User){
    this.userService.updatePrivileges(user.email, user.type).subscribe(resp=>{
      alert(resp['message'])
      window.location.reload();
    })
  }

  block(user: User, blocked: boolean){
    this.userService.setBlocked(user.email, blocked).subscribe(resp=>{
      alert(resp['message'])
      window.location.reload();
    })
  }

  front(){
    this.router.navigate(["admin"])
  }

}
