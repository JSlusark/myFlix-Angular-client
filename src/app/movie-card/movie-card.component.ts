// src/app/movie-card/movie-card.component.ts
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio
      },
      width: '1000px'
    });
  }

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


  addOrRemoveFavorite(id: string): void {
    this.fetchApiData.addOrRemoveFavoriteMovie(id).subscribe()
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }


}