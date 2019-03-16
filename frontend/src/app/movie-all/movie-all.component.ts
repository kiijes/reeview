import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-all',
  templateUrl: './movie-all.component.html',
  styleUrls: ['./movie-all.component.css']
})
export class MovieAllComponent implements OnInit {

  results: Movie[];
  constructor(
    private movieServ: MovieService
  ) { }

  ngOnInit() {
    this.movieServ.getAll().subscribe(res => {
      this.results = res;
    });
  }

}
