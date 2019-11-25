import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {City} from '../city';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css']
})
export class WeatherViewComponent implements OnInit {
  _city;
  weather:Weather;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  changeStatus(){
      this.onChange.emit();
  }

  @Input() set city(value) {
  if(value){
    this.weather=null;
    this._city = value;
    this.weatherService.getCurrentWeather(this._city.Key)
    .subscribe((data) =>
        this.weather=data
    );
  }else{
    this._city =null;
    this.weather=null;
  }
 }

 RemoveFromFavorites(){
  this.weatherService.RemoveFromFavorites(this._city)
    .subscribe(() =>{
      this._city.isFavorite=false;
      this.changeStatus();
    }
  );
 }

 AddToFavorites(){
    this.weatherService.AddToFavorites(this._city)
      .subscribe(() =>{
        this._city.isFavorite=true;
        this.changeStatus();
      }
    );
 }

  constructor(private weatherService: WeatherService) { }

 
  ngOnInit() {

  }

}
