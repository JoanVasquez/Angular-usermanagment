import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserSignupFormComponent } from './user-signup-form/user-signup-form.component';
import { UserSigninFormComponent } from './user-signin-form/user-signin-form.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserService } from './shared/user.service';
import { Routing } from './shared/router';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AlertService } from './shared/alert.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Modal } from './modal/modal.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { FilterPipe } from './shared/filter.pipe';
import { HttpClient } from 'selenium-webdriver/http';

@NgModule({
  declarations: [
    AppComponent,
    UserSignupFormComponent,
    UserSigninFormComponent,
    UserCardsComponent,
    HomeComponent,
    AlertComponent,
    Modal,
    UserEditComponent,
    UserDeleteComponent,
    FilterPipe
  ],
  entryComponents: [UserEditComponent, UserDeleteComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,
    NgxPaginationModule
  ],
  providers: [UserService, AuthGuardService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
