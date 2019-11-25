import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  } from './weather';
import { FavoriteComponent } from '../app/favorite/favorite.component';
import { AppComponent } from './app.component';
import { SearchCityComponent } from './search-city/search-city.component';

const routes: Routes =  [{ path: '', component: SearchCityComponent },
{ path: 'favorites', component: FavoriteComponent },
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
