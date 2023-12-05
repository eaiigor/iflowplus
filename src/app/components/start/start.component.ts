import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  movies: Movie[] = [];
  showInfo: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.movies = this.movieService.getAllMovies();
  }


  showDetails(status: boolean) {
    this.showInfo = status;
  }
}