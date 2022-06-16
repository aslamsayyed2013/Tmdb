import { TmdbService } from '../../tmdb.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from '../tmdb.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  @Output() getActorToTmdb=new EventEmitter<Actor []>();

  actors:Actor [] = [];

  findActorByNameForm: FormGroup = new FormGroup({
    findByName: new FormControl('', ),
   });

  constructor(private tmdbService:TmdbService) { }

  ngOnInit(): void {
  }

  getByName(){
    let name=this.findActorByNameForm?.controls?.['findByName'].value;
    this.tmdbService.getActorByName(name)
    .subscribe({
      next:(actors)=>{
        this.actors=actors;
      }
    })
  }

  getActorByName(){
    this.getByName();
    this.getActorToTmdb.emit(this.actors);
  }
}


