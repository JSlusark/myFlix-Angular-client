//fetch api data service file

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://shrouded-ocean-05047.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Api call for the get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for the get one movie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for the get one director endpoint
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for the get one genre endpoint
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for the get one user endpoint
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  // Api call for the get favourite movies for a user endpoint
  getfavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.favoriteMovies),
      catchError(this.handleError)
    );
  }


  addOrRemoveFavoriteMovie(movieId: string): Observable<any> {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(user)
    // Check if favoriteMovies array exists in user object and initialize it if not present
    if (!user.favoriteMovies) {
      user.favoriteMovies = [];
    }
  
    // Check if movieId is already in the favoriteMovies array
    const index = user.favoriteMovies.indexOf(movieId);
    if (index !== -1) {
      // If movieId is already present, remove it from the list
      user.favoriteMovies.splice(index, 1);
      localStorage.setItem('user', JSON.stringify(user));
      alert("This movie was removed from your favorite list.");
      console.log("MovieId removed from this user's favorite list. Favoritelist data:");
      console.log(user.favoriteMovies)
    
      return this.http.delete(apiUrl + 'users/' + user.username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: "text"
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    } else {
      // If movieId is not present, add it to the list
      user.favoriteMovies.push(movieId);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("MovieId added to this user's favorite list.");
      alert("This movie was added to user's favorite list. Favoritelist data:");
      console.log(user.favoriteMovies)
      console.log(user);
      return this.http.post(apiUrl + 'users/' + user.username + '/movies/' + movieId, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: "text"
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  }


  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieId) > -1;
  }



  // Api call for the edit user endpoint
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log({ updatedUser });
    return this.http.put(apiUrl + 'users/' + user.username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for the delete user endpoint
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }









  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    }
    else if (error.error.errors) {
      return throwError(() => new Error(error.error.errors[0].msg));
    }
    else {
      console.error(
        `Error Status code ${error.status}`,
        error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}