import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {Observable} from "rxjs";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ]
})

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weather: Observable<Object>;

  constructor(private http: HttpClient) {
  }

  getForecastWeather(cityName) {
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=0eb7f6c19ec8c2bf929f74133fcbce7c';
    return this.http.get(weatherUrl);
  }

  getCurrentWeather(zipCode) {
    let currweatherUrl = 'http://api.weatherapi.com/v1/current.json?key=82e683c8bf114bb0afb141616200107&q='+zipCode
    return this.http.get(currweatherUrl);
  }

  getDailyWeather(cityNme,zipCode) {
    let dailyweatherUrl = 'http://api.weatherapi.com/v1/forecast.json?key=82e683c8bf114bb0afb141616200107&q='+zipCode+'&days=3';
    console.log(dailyweatherUrl)
    return this.http.get(dailyweatherUrl);
  }
  getHistoryWeather(oldDate,zipCode) {
    let hourweatherUrl = 'http://api.weatherapi.com/v1/history.json?key=82e683c8bf114bb0afb141616200107&q='+zipCode+'&dt='+oldDate;
    console.log(hourweatherUrl)
    return this.http.get(hourweatherUrl);
  }
  getSearchHistory(cityName,zipCode) {
    let req = {
      city : cityName,
      zipCode : zipCode
    }

    let searchHistoryUrl = 'http://localhost:3000/api/search-history/search';
    return  this.http.post(searchHistoryUrl, req);
  }
  insertSearchHistory(json) {
    let searchHistoryPostUrl = 'http://localhost:3000/api/search-history';
    return this.http.post(searchHistoryPostUrl, json);
  }

}
