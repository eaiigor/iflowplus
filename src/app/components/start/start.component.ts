import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  carouselMovies: Movie[] = [];
  coverMovies: Movie[] = [];
  showInfo: boolean = false;
  selectedSort: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const allMovies = this.movieService.getAllMovies();
    this.carouselMovies = allMovies.slice(0, 5);
    this.coverMovies = allMovies.slice(0, 5);
  }

  showDetails(status: boolean): void {
    this.showInfo = status;
  }

  goToMovieDetails(movie: Movie): void {
    window.location.replace(`/movie/${movie.id}`);
  }

  orderByTitle() {
    this.coverMovies.sort((a, b) => a.title.localeCompare(b.title));
    this.selectedSort = 'title';
  }

  orderByReleaseDate() {
    this.coverMovies.sort((a, b) => new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime());
    this.selectedSort = 'releaseDate';
  }
}