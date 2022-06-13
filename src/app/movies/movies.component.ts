import { TmdbService } from './../tmdb.service';
import { Actor, Artist, Movies } from './../tmdb/tmdb.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movies[] = [];
  artistBySubject: Artist | undefined;
  subscriptions: Subscription[]=[];

  @Output() getMoviesToTmdb=new EventEmitter<Movies []>();
  // @Input('artist') artist:Artist | undefined;

  constructor(private tmdbService:TmdbService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.tmdbService.artist
      .subscribe({
        next:(resp)=>{
          this.artistBySubject=resp;
        }
      }))

  }

  getMoviesByActorId(){
    // let id=this.artist?.id;

    let id=this.artistBySubject?.id;


    this.tmdbService.getMoviesByActorId(id)
    .subscribe({
      next:(resp)=>{
        this.movies=resp;
      }
    })
  }

  getMoviesListForArtist(){
    this.getMoviesByActorId();
    this.getMoviesToTmdb.emit(this.movies);
  }


}
