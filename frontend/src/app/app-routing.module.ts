import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUpdateBookComponent } from './admin-update-book/admin-update-book.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { BooksComponent } from './books/books.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginComponent } from './login/login.component';
import { ModComponent } from './mod/mod.component';
import { ProfileComponent } from './profile/profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { RequestAddBookComponent } from './request-add-book/request-add-book.component';
import { RequestsComponent } from './requests/requests.component';
import { SearchComponent } from './search/search.component';
import { StartPageComponent } from './start-page/start-page.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ViewIssuedComponent } from './view-issued/view-issued.component';

const routes: Routes = [
  {path: '', component:StartPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'mod', component:ModComponent},
  {path: 'reader', component:ReaderComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'search', component: SearchComponent},
  {path: 'front-page', component: FrontPageComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'books', component: BooksComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'admin-users', component: AdminUsersComponent},
  {path: 'admin-books', component: AdminBooksComponent},
  {path: 'update-book', component:UpdateBookComponent},
  {path: 'admin-update-user', component: AdminUpdateUserComponent},
  {path: 'admin-update-book', component: AdminUpdateBookComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'book-requests', component: BookRequestsComponent},
  {path: 'request-add-book', component: RequestAddBookComponent},
  {path: 'view-issued', component: ViewIssuedComponent},
  {path: 'view-history', component: ViewHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
