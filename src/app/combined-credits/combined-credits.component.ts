import { TmdbService } from './../tmdb.service';
import { Artist, CombinedCredits } from './../tmdb/tmdb.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-combined-credits',
  templateUrl: './combined-credits.component.html',
  styleUrls: ['./combined-credits.component.css']
})
export class CombinedCreditsComponent implements OnInit {

  combinedCredits:CombinedCredits []=[];

  @Input('artist') artist:Artist | undefined;
  @Output() getCombinedCreditsToTmdb=new EventEmitter<CombinedCredits[]>();
  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
  }

  getCombinedCreditsByActorId(){
    let id=this.artist?.id;

    this.tmdbService.getCombinedCreditsByActorId(id)
    .subscribe({
      next:(resp)=>{
        this.combinedCredits=resp
      }
    })
  }

  getCombinedCreditsListForArtist(){
    this.getCombinedCreditsByActorId();
    this.getCombinedCreditsToTmdb.emit(this.combinedCredits);
  }

}
