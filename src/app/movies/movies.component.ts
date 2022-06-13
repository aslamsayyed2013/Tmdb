import { TmdbService } from './../tmdb.service';
import { Artist, Movies } from './../tmdb/tmdb.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movies[] = [];

  @Output() getMoviesToTmdb=new EventEmitter<Movies []>();
  @Input('artist') artist:Artist | undefined;

  constructor(private tmdbService:TmdbService) { }

  ngOnInit(): void {

  }

  getMoviesByActorId(){
    let id=this.artist?.id;

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
