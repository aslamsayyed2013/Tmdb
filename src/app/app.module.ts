import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TmdbService } from './tmdb.service';
import { TmdbComponent } from './tmdb/tmdb.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './tmdb/movies/movies.component';
import { TvCreditsComponent } from './tmdb/tv-credits/tv-credits.component';
import { CombinedCreditsComponent } from './tmdb/combined-credits/combined-credits.component';
import { ActorComponent } from './tmdb/actor/actor.component';

@NgModule({
  declarations: [
    AppComponent,
    TmdbComponent,
    MoviesComponent,
    TvCreditsComponent,
    CombinedCreditsComponent,
    ActorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
