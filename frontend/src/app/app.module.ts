import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ModComponent } from './mod/mod.component';
import { ReaderComponent } from './reader/reader.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StartPageComponent } from './start-page/start-page.component'
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BooksComponent } from './books/books.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminUpdateBookComponent } from './admin-update-book/admin-update-book.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { RequestAddBookComponent } from './request-add-book/request-add-book.component';
import { ViewIssuedComponent } from './view-issued/view-issued.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ModComponent,
    ReaderComponent,
    UserComponent,
    StartPageComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ProfileComponent,
    SearchComponent,
    BooksComponent,
    FrontPageComponent,
    UpdateUserComponent,
    AdminLoginComponent,
    UpdateBookComponent,
    RequestsComponent,
    AdminUsersComponent,
    AdminBooksComponent,
    AdminUpdateBookComponent,
    AdminUpdateUserComponent,
    AddUserComponent,
    AddBookComponent,
    BookRequestsComponent,
    RequestAddBookComponent,
    ViewIssuedComponent,
    ViewHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
