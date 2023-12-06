import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.model';
import { MyListService } from 'src/app/service/my-list.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent {

  movieList: Movie[];

  constructor(private myListService: MyListService) {
    this.movieList = this.myListService.getMovieList();
  }

  goToMovieDetails(movie: Movie): void {
    window.location.replace(`/movie/${movie.id}`);
  }

}
