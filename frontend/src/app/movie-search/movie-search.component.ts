import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  results: Movie[];

  constructor(
    private movieServ: MovieService
  ) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.movieServ.searchMovies({ 'search': formData.search }).subscribe(res => {
      this.results = res;
    });
  }
}
