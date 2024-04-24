import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert, IonLabel } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList,  IonItem, IonSkeletonText, IonAvatar, IonAlert, IonLabel, DatePipe],
})
export class HomePage {
  private moviesService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);

  constructor() {
    this.loadMovies();
  }

  // loadMovies(){
  //   this.moviesService.getTopRatedMovies().subscribe((movies) => {
  //     console.log(movies);
  //   });

  //   this.moviesService.getMovieDetails('872585').subscribe((movies) => {
  //     console.log(movies);
  //   });
  // }

  loadMovies(event?: InfiniteScrollCustomEvent){
    this.error = null;

    if(!event){
      this.isLoading = true;
    }

    this.moviesService.getTopRatedMovies(this.currentPage)
    .pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);

        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.movies.push(...res.results);

        if(event){
          // event.target.disabled = true;
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    })
  }

  loadMore(event:InfiniteScrollCustomEvent){

  }
}
