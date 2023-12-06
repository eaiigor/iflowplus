import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MyListService {

  constructor() { }

  getMovieList(): Movie[] {
    return JSON.parse(localStorage.getItem('movieList') || '[]');
  }

  addMovieToList(movie: Movie): void {
    let movieList = JSON.parse(localStorage.getItem('movieList') || '[]');
    movieList.push(movie);
    localStorage.setItem('movieList', JSON.stringify(movieList));
  }

  removeMovieFromList(movie: Movie): void {
    let movieList = this.getMovieList();
    movieList = movieList.filter((item: Movie) => item.id !== movie.id);
    localStorage.setItem('movieList', JSON.stringify(movieList));
  }
}
