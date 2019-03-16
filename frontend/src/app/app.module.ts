import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieLatestComponent } from './movie-latest/movie-latest.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieAllComponent } from './movie-all/movie-all.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    IndexComponent,
    SignupComponent,
    PageNotFoundComponent,
    MovieFormComponent,
    AdminComponent,
    AdminDashComponent,
    MovieInfoComponent,
    MovieLatestComponent,
    MovieHomeComponent,
    MovieSearchComponent,
    MovieAllComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
