import { Artist, CombinedCredits, Movies, TvCredits, Actor } from './tmdb.model';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tmdb',
  templateUrl: './tmdb.component.html',
  styleUrls: ['./tmdb.component.css']
})
export class TmdbComponent implements OnInit {

   actors: Actor []| undefined;
   artist: Artist | undefined;
   movies: Movies[] | undefined;
   tvCredits:TvCredits[] | undefined;
   combinedCredits: CombinedCredits[] | undefined;

   displayMovies:boolean = true;
   displayTvCredits:boolean = true;
   displayCombinedCredits:boolean = true;
   age: number | undefined;
   artistCategory:string = "Senior Actor";

   findArtistByIdForm: FormGroup = new FormGroup({
    findById: new FormControl(null, [
      Validators.min(0),
      Validators.required
     ]),
   });

  constructor(private tmdbService:TmdbService) { }

  ngOnInit(): void {
  }

  getArtistById(){
    let id= this.findArtistByIdForm?.controls?.['findById'].value;
    this.getById(id);
}

getById(id:string){
  this.tmdbService.getArtistById(id)
  .subscribe({
    next:(resp)=>{
      this.artist=resp;
      this.tmdbService.artist.next(this.artist)
      this.calculateAgeAndGetTypeOfActor(this.artist?.birthday);
    }
  })
}

  calculateActorTypeOnAge(age: number) {
    if(age<=20){
      this.artistCategory="Child Actor";
    }else if(age<=40 && age>20){
      this.artistCategory="Mid Age Actor";
    }else{
      this.artistCategory="Senior Actor";
    }
  }

  calculateAgeAndGetTypeOfActor(birthday: Date) {
    if (birthday) {
      const bdate = new Date(birthday);
      const milisecond=1000;
      const secondsToMinute=3600;
      const hour= 24;
      const timeDiff = Math.abs(Date.now() - bdate.getTime() );
      this.age = Math.floor((timeDiff / (milisecond * secondsToMinute * hour)) / 365);
      this.calculateActorTypeOnAge(this.age);
    }
  }

assignDataFromMoviestoTmdbComponent(movies: Movies[]){
   this.displayMovies=!this.displayMovies;
  this.movies=movies;
}

assignDataFromTvCreditsToTmdbComponent(tvCredits: TvCredits[]){
   this.displayTvCredits=!this.displayTvCredits;
  this.tvCredits=tvCredits;
}

assignDataFromCombinedCreditsToTmdbComponent(combinedCredits: CombinedCredits[]){
  this.displayCombinedCredits=!this.displayCombinedCredits;
 this.combinedCredits=combinedCredits;
}

assignDataFromActorToTmdbComponent(actors:Actor []){
  this.actors=actors;
}
}


