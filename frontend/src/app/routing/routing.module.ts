import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthGuard } from '../auth.guard';
import { AdminGuard } from '../admin.guard';
import { AdminDashComponent } from '../admin-dash/admin-dash.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MovieLatestComponent } from '../movie-latest/movie-latest.component';
import { MovieHomeComponent } from '../movie-home/movie-home.component';
import { MovieAllComponent } from '../movie-all/movie-all.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
    { path: '', component: AdminDashComponent },
    { path: 'add', component: MovieFormComponent }
  ] },
  { path: 'movie/:id', component: MovieInfoComponent },
  { path: 'movies', component: MovieHomeComponent },
  { path: 'movies/all', component: MovieAllComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
