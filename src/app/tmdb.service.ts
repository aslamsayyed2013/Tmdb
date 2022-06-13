import { Actor, Artist, CombinedCredits, Movies, TvCredits } from './tmdb/tmdb.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl:string = 'http://localhost:8080/tmdb'

  nameAndId: Subject<Actor>= new Subject();
  id: Subject<Artist>= new Subject();
  constructor(private http:HttpClient) { }

  getActorByName(name:string){
    this.http.get<Actor>(this.baseUrl+ `${name}`)
  }

  getArtistById(id :string):Observable<Artist>{
    return this.http.get<Artist>(this.baseUrl + `/${id}`)
  }

  getMoviesByActorId(id: string | undefined) {
    return this.http.get<Movies []>(this.baseUrl + `/${id}` + `/movies`)
  }

  getTvCreditsByActorId(id: string | undefined) {
    return this.http.get<TvCredits []>(this.baseUrl + `/${id}` + `/tv_credits`)
  }

  getCombinedCreditsByActorId(id: string | undefined) {
    return this.http.get<CombinedCredits []>(this.baseUrl + `/${id}` + `/combined_credits`)
  }

}
