// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

//   constructor(public dialog: MatDialog) { }
// // This is the function that will open the dialog when the signup button is clicked  
// openUserRegistrationDialog(): void {
//     this.dialog.open(UserRegistrationFormComponent, {
// // Assigning the dialog a width
//     width: '280px'
//     });
//   }

//   openUserLoginDialog(): void {
//     this.dialog.open(UserLoginFormComponent, {
// // Assigning the dialog a width
//     width: '280px'
//     });
//   }

//   openMoviesDialog(): void {
//     this.dialog.open(MovieCardComponent, {
//       width: '500px'
//     });
//   }


}
