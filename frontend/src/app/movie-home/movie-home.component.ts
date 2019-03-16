import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit {

  private error: String;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('error') === '1') {
      this.error = 'Movie not found.';
    }
  }

}
