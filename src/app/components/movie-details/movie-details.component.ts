import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/service/movie.service';
import { MyListService } from 'src/app/service/my-list.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie = {
    id: 0,
    title: '',
    description: '',
    rating: 0,
    duration: '',
    genre: [],
    releasedDate: '',
    trailerLink: '',
    imageUrl: '',
    bgImageUrl: '',
    imgCover: ''
  };
  
  bgImageUrl: string | undefined;
  safeTrailerUrl: SafeResourceUrl | undefined;

  @ViewChild('videoElement') videoElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private myListService: MyListService
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      this.movie = this.movieService.getMovieById(parseInt(movieId, 10));
      this.bgImageUrl = this.movie?.bgImageUrl;
      this.safeTrailerUrl = this.getSafeTrailerUrl(this.movie?.trailerLink || '');
    }
  }

  getSafeTrailerUrl(trailerLink: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(trailerLink);
  }

  scrollToVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  addToMovieList(movie: Movie): void {
    this.myListService.addMovieToList(movie);
  }

  isMovieInList(movie: Movie): boolean {
    const movieList = this.myListService.getMovieList();
    return movieList.some((item: Movie) => item.id === movie.id);
  }

  toggleMovieStatus(movie: Movie): void {
    if (this.isMovieInList(movie)) {
      this.myListService.removeMovieFromList(movie);
    } else {
      this.myListService.addMovieToList(movie);
    }
  }
}