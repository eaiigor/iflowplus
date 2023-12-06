import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';
  searchResults: Movie[] = [];

  constructor(private movieService: MovieService) {}

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.movieService.getAllMovies().filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToMovieDetails(movie: Movie): void {
    window.location.replace(`/movie/${movie.id}`);
  }
}