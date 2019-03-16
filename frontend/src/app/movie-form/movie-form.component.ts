import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  error: String;
  isError: Boolean = false;
  constructor(
    private movieServ: MovieService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (
      formData.title.length > 200 ||
      !formData.title.trim() ||
      typeof formData.year !== 'number' ||
      !formData.year ||
      formData.director.length > 100 ||
      !formData.director.trim()
    ) {
      this.isError = true;
      this.error = 'Form is not valid';
      return;
    }

    this.movieServ.addMovie({
      'title': formData.title.trim(),
      'year': formData.year,
      'director': formData.director.trim()
    }).then((data: Movie) => {
      this.router.navigate(['/movie/' + data._id]);
    }).catch((error: any) => {
      this.isError = true;
      this.error = error.error.message;
    });
  }

}
