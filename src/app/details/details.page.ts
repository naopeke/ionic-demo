import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonBackButton, IonButtons, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonBackButton, IonButtons, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonItem, IonLabel, IonText, CurrencyPipe, DatePipe]
})
export class DetailsPage {

  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);


  // Load the movie details when the id changes (/:id param)

  //Create a new Signal: signal<T>(initialValue)
  //Set the value      : set(newValue)
  //Get the value      : calling the signal()

  @Input()
  set id(movieId: string){
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie);
    });
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }



}
