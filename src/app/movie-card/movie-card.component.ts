// src/app/movie-card/movie-card.component.ts
/**
 * Movie Card Component.
 * This component displays movie cards and handles interactions with movies.
 */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
 * This method will get all movies from the database, which are then displayed on the movie card component.
 * @param void
 * @returns movies array
 * @memberof MovieCardComponent
 * @see FetchApiDataService.getAllMovies()
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Opens the movie information dialog with detailed movie information.
   * @param title - The title of the movie.
   * @param description - The description/synopsis of the movie.
   * @param image - The URL of the movie poster image.
   * @param directorName - The name of the movie's director.
   * @param directorBio - The biography of the movie's director.
   * @param genreName - The name of the movie's genre.
   * @param genreDescription - The description of the movie's genre.
   * @memberof MovieCardComponent
   * @see MovieInfoComponent
   * @example openSynopsis() 
   */

  openSynopsis(
    title: string,
    description: string,
    image: string,
    directorName: string,
    directorBio: string,
    genreName: string,
    genreDescription: string
  ): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: title,
        content: description,
        image: image,
        directorName: directorName,
        directorBio: directorBio,
        genreName: genreName,
        genreDescription: genreDescription
      },
      width: '700px'
    });
  }

  /**
   * Adds or removes a movie from the user's favorites list.
   * @param id - The ID of the movie to be added or removed from favorites.
   */
  addOrRemoveFavorite(id: string): void {
    this.fetchApiData.addOrRemoveFavoriteMovie(id).subscribe()
  }

  /**
   * Checks if a movie with the specified ID is in the user's favorites list.
   * @param id - The ID of the movie to check for in favorites.
   * @returns True if the movie is in favorites, false otherwise.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }


}