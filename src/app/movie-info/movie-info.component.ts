// src/app/movie-info/movie-info.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})

/** 
 * This component will render the movie info dialog
 * @export
 * @class MovieInfoComponent
 * @implements {OnInit}
 * @example <app-movie-info></app-movie-info>
 * @param {Object} data - The data to be displayed in the movie info dialog.
 * @param {string} data.title - The title of the movie.
 * @param {string} data.content - The description/synopsis of the movie.
 * @param {string} data.image - The URL of the movie poster image.
 * @param {string} data.directorName - The name of the movie's director.
 * @param {string} data.directorBio - The biography of the movie's director.
 * @param {string} data.genreName - The name of the movie's genre.
 * @param {string} data.genreDescription - The description of the movie's genre.
 * @see MAT_DIALOG_DATA
 */

export class MovieInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      image: string;
      directorName:string;
      directorBio:string;
      genreName: string;
    genreDescription: string
    }
  ) { }

  ngOnInit(): void {}
}