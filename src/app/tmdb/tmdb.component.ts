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

   actor: Actor []| undefined;
   artist: Artist | undefined;
   movies: Movies[] | undefined;
   tvCredits:TvCredits[] | undefined;
   combinedCredits: CombinedCredits[] | undefined;

   isdisplayMovies:boolean = true;
   isDisplayTvCredits:boolean = true;
   isDisplayCombinedCredits:boolean = true;
   age: number | undefined;
   type:string = "Senior Actor";

   findArtistByIdForm: FormGroup = new FormGroup({
    findById: new FormControl(null, [
      Validators.min(0),
      Validators.required
     ]),
   });

  constructor(private TmdbService:TmdbService) { }

  ngOnInit(): void {

  }

  getArtistById(){
    let id= this.findArtistByIdForm?.controls?.['findById'].value;
    this.getById(id);
}

checkMethod(){
  console.log(this.findArtistByIdForm.controls?.['findById'].errors?.['min']);
}
getById(id:string){
  this.TmdbService.getArtistById(id)
  .subscribe({
    next:(resp)=>{
      this.artist=resp;
      this.TmdbService.artist.next(this.artist)
    if (this.artist?.birthday) {
      debugger;
      const bdate = new Date(this.artist?.birthday);
      const timeDiff = Math.abs(Date.now() - bdate.getTime() );
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      if(this.age<=20){
        this.type="Child Actor"
      }
    }
    }
  })
}

assignDataToMoviesObject(movies: Movies[]){
   this.isdisplayMovies=!this.isdisplayMovies;
  this.movies=movies;
}

assignDataToTvCreditsObject(tvCredits: TvCredits[]){
   this.isDisplayTvCredits=!this.isDisplayTvCredits;
  this.tvCredits=tvCredits;
}


assignDataToCombinedCreditsObject(combinedCredits: CombinedCredits[]){
  this.isDisplayCombinedCredits=!this.isDisplayCombinedCredits;
 this.combinedCredits=combinedCredits;
}

assignDataToActorObject(actor:Actor []){
  debugger;
  this.actor=actor;
}

}


