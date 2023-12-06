import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/service/movie.service';
import { MyListService } from 'src/app/service/my-list.service';

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

  constructor(
    private movieService: MovieService,
    private myListService: MyListService
  ) { }

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

  orderByTitle(): void {
    this.coverMovies.sort((a, b) => a.title.localeCompare(b.title));
    this.selectedSort = 'title';
  }

  orderByReleaseDate(): void {
    this.coverMovies.sort((a, b) => new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime());
    this.selectedSort = 'releaseDate';
  }

  isMovieInList(movie: Movie): boolean {
    const movieList = this.myListService.getMovieList();
    return movieList.some((item: Movie) => item.id === movie.id);
  }
}