import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, Forecast, PForecast, SForecast, Weather } from './interfaces/Models.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagementServiceService {

constructor(
  private http: HttpClient,
  ) { }

api_key = 'apikey=TPvPdYgL4gc3n5sr7spv4LhJrU3KpELC';

base_url = "http://dataservice.accuweather.com/";
language = "&language=pl";
autocomplete_endpoint = "locations/v1/cities/autocomplete?"+this.api_key+"&q=";
current_conditions_endpoint = "currentconditions/v1/";
one_hour_forecast_endpoint = "forecasts/v1/hourly/1hour/";
twelve_hour_forecast_endpoint = "forecasts/v1/hourly/12hour/";
one_daily_forecast_endpoint = "forecasts/v1/daily/1day/";
five_days_forecast_endpoint = "forecasts/v1/daily/5day/";
yesterday_forecast_endpoint = "currentconditions/v1/";//         :locationKey/historical/24"

getAutoCompleteLocations(q: string) : Observable<City[]> {
  return this.http.get<City[]>(this.base_url+this.autocomplete_endpoint+q+this.language);
}

getCurrentConditions(key: string) : Observable<Weather[]> {
 return this.http.get<Weather[]>(this.base_url+this.current_conditions_endpoint+key+'?'+this.api_key+this.language);
}


getOneHourForecast(key: string) : Observable<SForecast[]> {
  return this.http.get<SForecast[]>(this.base_url+this.one_hour_forecast_endpoint+key+'?'+this.api_key+this.language+"&metric=true");
 }

 getTwelveHourForecast(key: string) : Observable<SForecast[]> {
  return this.http.get<SForecast[]>(this.base_url+this.twelve_hour_forecast_endpoint+key+'?'+this.api_key+this.language+"&metric=true");
 }

 getOneDailyForecast(key: string) : Observable<Forecast> {
  return this.http.get<Forecast>(this.base_url+this.one_daily_forecast_endpoint+key+'?'+this.api_key+this.language+"&metric=true");
 }

 getFiveDaysForecast(key: string) : Observable<Forecast> {
  return this.http.get<Forecast>(this.base_url+this.five_days_forecast_endpoint+key+'?'+this.api_key+this.language+"&metric=true");
 }

 getYesterdayForecast(key: string) : Observable<PForecast[]> {
  return this.http.get<PForecast[]>(this.base_url+this.yesterday_forecast_endpoint+key+"/historical/24"+'?'+this.api_key+this.language);
 }


}
