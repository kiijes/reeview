import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-latest',
  templateUrl: './movie-latest.component.html',
  styleUrls: ['./movie-latest.component.css']
})
export class MovieLatestComponent implements OnInit {

  movies: Movie[];
  constructor(
    private movieServ: MovieService
  ) { }

  ngOnInit() {
    this.movieServ.getLatest().subscribe(res => {
      this.movies = res;
    });
  }

  refresh() {
    this.movieServ.getLatest().subscribe(res => {
      this.movies = res;
    });
  }

}
