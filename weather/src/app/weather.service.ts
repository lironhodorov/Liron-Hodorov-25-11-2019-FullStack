import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {City} from '../app/city';
import {Weather} from '../app/weather';
import { Favorite } from './favorite';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url:string;
  constructor(private http: HttpClient) { 
    this.url='http://localhost:50659/api/weather/';
  }
  
  getAutoComplete(city: string) {
    return this.http.get<City[]>(this.url + "autocomplete?q="+city);
  }

  getCurrentWeather(key: string) {
    return this.http.post<Weather>(this.url + "GetCurrentWeather",{"Key":key});
  }

  AddToFavorites(city:City){
    return this.http.post(this.url + "AddToFavorites",
    {key:city.Key,name:city.LocalizedName});
  }

  RemoveFromFavorites(city:City){
    return this.http.post(this.url + "RemoveFromFavorites",
    {key:city.Key});
  }

  GetFavorites(){
    return this.http.get<Favorite[]>(this.url + "GetFavorites");
  }
}
