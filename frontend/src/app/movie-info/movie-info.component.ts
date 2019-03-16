import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MovieService } from '../movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  private movie;
  private admin: boolean;
  private score;
  private comments;
  private user_id;
  private movie_id;
  private commentToEdit = '';
  private textToEdit = '';
  private movieEditToggle = false;
  private defaultValue = '';
  private commentError = '';
  private commentEditError = '';
  private userReviewScore;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieServ: MovieService,
    private authServ: AuthService
  ) { }

  ngOnInit() {
    this.user_id = this.authServ.getId();
    this.movie_id = this.route.snapshot.paramMap.get('id');

    this.movieServ.getMovie(this.movie_id).then((data: Movie) => {
      this.movie = data;
    }).catch(err => {
      this.router.navigate(['/movies'], { queryParams: { error: 1 } });
    });

    this.movieServ.getReviews(this.movie_id).subscribe(res => {
      if (!res[0]) {
        this.score = 'Not yet rated';
        return;
      }
      this.score = res[0].total.toFixed(1);
    });

    this.movieServ.getComments(this.movie_id).subscribe(res => {
      if (!res[0]) {
        return;
      }
      this.comments = res;
    });

    if (this.authServ.isAdmin()) {
      this.admin = true;
    } else {
      this.admin = false;
    }

    if (this.user_id) {
      this.getUserReview();
    }

  }

  delete() {
    this.movieServ.deleteMovie(this.movie_id).subscribe(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/movies']));
    });
  }

  deleteComment(comment_id, comment_user_id) {
    if (comment_user_id === this.user_id || this.authServ.isAdmin()) {
      this.movieServ.deleteComment(comment_id, comment_user_id).subscribe(res => {
        this.movieServ.getComments(this.movie_id).subscribe(_res => {
          if (!_res[0]) {
            this.comments = '';
            return;
          }
          this.comments = _res;
        });
      });
    } else {
      console.log('You are not this user');
      return;
    }
  }

  getUserReview() {
    this.movieServ.getReview(this.movie_id, this.user_id)
      .then(res => {
        this.userReviewScore = res.score;
      }).catch(err => {
        this.userReviewScore = '';
      });
  }

  deleteReview() {
    if (!this.user_id) {
      console.log('no user id');
      return;
    }
    this.movieServ.deleteReview(this.movie_id, this.user_id).subscribe(() => {
      this.movieServ.getReviews(this.movie_id).subscribe(res => {
        if (!res[0]) {
          this.score = 'Not yet rated';
          this.userReviewScore = '';
          return;
        }
        this.score = res[0].total.toFixed(1);
        this.userReviewScore = '';
      });
    });
  }

  onSubmit(formData) {
    this.movieServ.reviewMovie(this.movie_id, { 'user_id': this.user_id, 'score': formData.score })
      .subscribe(res => {
        this.movieServ.getReviews(this.movie_id).subscribe(_res => {
          this.score = _res[0].total;
        });
        this.getUserReview();
      });
  }

  onCommentSubmit(formData) {
    if (!formData.commentArea.trim()) {
      this.commentError = 'Comment area can not be empty';
      return;
    }
    this.movieServ.addOrEditComment(
      this.movie_id, { 'user_id': this.user_id, 'comment': formData.commentArea.trim(), 'user': this.authServ.getName() }
      )
      .subscribe(res => {
        this.defaultValue = '';
        this.commentError = '';
        this.movieServ.getComments(this.movie_id).subscribe(_res => {
          if (!_res[0]) {
            return;
          }
          this.comments = _res;
        });
      });
  }

  onCommentEditSubmit(formData, comment_id, user_id) {
    if (!formData.editComment.trim()) {
      this.commentEditError = 'Comment can\'t be empty';
      return;
    }
    this.editToggle('cancel');

    this.movieServ.addOrEditComment(
      this.movie_id, { 'user_id': user_id, 'comment': formData.editComment.trim(), 'user': this.authServ.getName(), '_id': comment_id }
    )
    .subscribe(res => {
      this.textToEdit = '';
      this.commentEditError = '';
      this.movieServ.getComments(this.movie_id).subscribe(_res => {
        if (!_res[0]) {
          return;
        }
        this.comments = _res;
      });
    });
  }

  onMovieEditSubmit(formData, movie_id) {
    if (
      formData.title.length > 200 ||
      !formData.title.trim() ||
      typeof formData.year !== 'number' ||
      formData.year === undefined ||
      formData.director.length > 100 ||
      !formData.director.trim()
    ) {
      console.log('Form is not valid');
      return;
    }

    this.movieServ.editMovie(movie_id, {
      'title': formData.title.trim(),
      'year': formData.year,
      'director': formData.director.trim()
    }).then((data: Movie) => {
      this.movieEditToggle = false;
      this.movie = data;
    }).catch((error: any) => {
      console.log(error);
    });

  }

  editToggle(comment) {
    if (this.commentToEdit === '') {
      this.commentToEdit = comment._id;
      this.textToEdit = comment.comment;
      this.commentEditError = '';
    } else if (comment === 'cancel') {
      this.commentToEdit = '';
      this.commentEditError = '';
    } else {
      this.commentToEdit = comment._id;
      this.textToEdit = comment.comment;
      this.commentEditError = '';
    }
  }

  editMovieToggle() {
    this.movieEditToggle = !this.movieEditToggle;
  }

  formatDate(date) {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return day + '.' + month + '.' + year + ' at ' + hours + ':' + minutes + ':' + seconds;
  }

}
