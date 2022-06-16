import { TmdbService } from '../../tmdb.service';
import { Artist, TvCredits } from '../tmdb.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tv-credits',
  templateUrl: './tv-credits.component.html',
  styleUrls: ['./tv-credits.component.css']
})
export class TvCreditsComponent implements OnInit {

  tvCredits: TvCredits[]=[];

  @Input('artist') artist:Artist | undefined;
  @Output() getTvCreditsToTmdb=new EventEmitter<TvCredits []>();

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
  }

  getTvCreditsByActorId(){
    let id=this.artist?.id;

    this.tmdbService.getTvCreditsByActorId(id)
    .subscribe({
      next:(tvCredits)=>{
        this.tvCredits=tvCredits;
      }
    })
  }

  getTvCreditsListForArtist(){
    this.getTvCreditsByActorId();
    this.getTvCreditsToTmdb.emit(this.tvCredits);
  }
}
