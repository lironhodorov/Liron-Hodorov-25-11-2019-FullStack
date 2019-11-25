import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { WeatherService } from '../weather.service';
import {Favorite} from '../favorite';
@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  favorites:Favorite[];
  cities: City[] = [];
  tag: string;
  constructor(private weatherService: WeatherService) { }
  selectedCity;
  onSelect(city: City): void {
    var isFavorite=this.favorites.find(element => element.Key=== city.Key);
    this.selectedCity = city;
    this.selectedCity.isFavorite=isFavorite!=null;
  }
  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.weatherService.GetFavorites().subscribe((data)=>this.favorites=data);
  }

  onSearch() {
    this.cities = [];
    this.selectedCity = null;
    this.weatherService.getAutoComplete(this.tag)
      .subscribe((data) =>
          this.cities=data
      );
  }


}