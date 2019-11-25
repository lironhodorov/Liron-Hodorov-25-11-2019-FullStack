import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites:Favorite[];
  selectedCity;
  constructor(private weatherService:WeatherService) { }
  onSelect(city: Favorite): void {
    this.selectedCity = city;
    this.selectedCity.isFavorite=true;
  }

  initPage(){
    this.favorites = [];
    this.selectedCity = null;
    this.weatherService.GetFavorites()
      .subscribe((data) =>
          this.favorites=data
      );
  }

  ngOnInit() {
    this.initPage();
  }

}
