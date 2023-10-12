import { Component, OnInit } from '@angular/core';
import { ApiManagementServiceService } from './api-management-service.service';
import { City, Forecast, PForecast, SForecast, Weather } from './interfaces/Models.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  city: string = '';
  title = 'WeatherForecast';
  options : string[] = [];
  selectedOption: string = '';
  cities: City[] = [];
  temp: number = 0;
  weather!: Weather;
  forecast!: Forecast;
  sforecast!: SForecast;
  pforecast!: PForecast;
  cityIsPicked = false;

  constructor(
    private api: ApiManagementServiceService
  ){ }

  ngOnInit(): void {
  }

  getCitiesNames(){
    this.options = [];
    this.api.getAutoCompleteLocations(this.city).subscribe((data)=>{
      this.cities = data;
      this.cities.forEach((elem)=>{
        this.options.push(elem.LocalizedName);
      })
    });
  }

  getCurrentLocation(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getCurrentConditions(this.cities[index].Key).subscribe((data)=>{
      if (data && data.length > 0) {
        this.weather = data[0];
      }
      this.cityIsPicked=true;
      this.temp = this.weather.Temperature.Metric.Value;
    });
  }

  getOneHourForecast(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getOneHourForecast(this.cities[index].Key).subscribe((data)=>{
      this.sforecast = data[0];
      this.cityIsPicked=true;
      this.temp = this.sforecast.Temperature.Value;
    });
  }

  getTwelveHourForecast(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getTwelveHourForecast(this.cities[index].Key).subscribe((data)=>{
      this.sforecast = data[11];
      this.cityIsPicked=true;
      this.temp = this.sforecast.Temperature.Value;
    });
  }

  getOneDailyForecast(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getOneDailyForecast(this.cities[index].Key).subscribe((data)=>{
      this.forecast = data;
      this.cityIsPicked=true;
      this.temp = this.forecast.DailyForecasts[0].Temperature.Minimum.Value;
    });
  }

  getFiveDaysForecast(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getFiveDaysForecast(this.cities[index].Key).subscribe((data)=>{
      this.forecast = data;
      this.cityIsPicked=true;
      this.temp = this.forecast.DailyForecasts[4].Temperature.Minimum.Value;
    });
  }

  getYesterdayForecast(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getYesterdayForecast(this.cities[index].Key).subscribe((data)=>{
      this.pforecast = data[23];
      this.cityIsPicked=true;
      this.temp = this.pforecast.Temperature.Metric.Value;
    });
  }
}
