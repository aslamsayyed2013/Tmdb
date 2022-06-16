import { TmdbService } from '../../tmdb.service';
import { Actor, Artist, Movies } from '../tmdb.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movies[] = [];
  artist: Artist | undefined;
  subscriptions: Subscription[]=[];

  @Output() getMoviesToTmdb=new EventEmitter<Movies []>();

  constructor(private tmdbService:TmdbService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.tmdbService.artist
      .subscribe({
        next:(artist)=>{
          this.artist=artist;
        }
      }))
  }

  getMoviesByActorId(){
    let id=this.artist?.id;

    this.tmdbService.getMoviesByActorId(id)
    .subscribe({
      next:(movies)=>{
        this.movies=movies;
      }
    })
  }

  getMoviesListForArtist(){
    this.getMoviesByActorId();
    this.getMoviesToTmdb.emit(this.movies);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription) => subscription?.unsubscribe());
  }
}
