import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import { getLocaleDateFormat } from '@angular/common';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less'],
  providers: [DatePipe]
})

export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService,private datePipe: DatePipe) {
  }
  isSeen=true;
  isDisplayed=true;
  isDisplay=true;
  isDisplaying=true;
  isSearchHistoryEnabled= false;
  cityName = '';
  zipCode=null;
  currentWeatherInfo = null;
  forecastWeatherInfo = null;
  weatherInfo = null;
  dailyWeatherInfo =null;
  dailyforecastWeatherInfo=null;
  myDate = new Date()
  oldDate=''
  time=null;
  historyWeatherInfo=null;
  historyforecastWeatherInfo=null;
  searchHistoryInfo= null;

  getWeather(): void {
    this.isSearchHistoryEnabled = false
    this.isSeen=!this.isSeen
    this.weatherService.getCurrentWeather(this.zipCode).subscribe(data => {
      this.currentWeatherInfo = data;

      let json ={
        city:  this.cityName,
        zipCode: this.zipCode,
        forecast: [
          {
            date: this.currentWeatherInfo.current.last_updated,
            temperature: this.currentWeatherInfo.current.temp_c ,
            humidity : this.currentWeatherInfo.current.humidity ,
            feelsLike : this.currentWeatherInfo.current.feelslike_c
          }
        ]
      }
      this.weatherService.insertSearchHistory(json).subscribe(fromJson => {
        console.log('Sent Data')
      })
    })
  }
  getForecastWeather():void{
    this.isSearchHistoryEnabled = false
    this.isDisplayed =!this.isDisplayed
    this.weatherService.getForecastWeather(this.cityName).subscribe(data => {
      this.weatherInfo = data;
      this.forecastWeatherInfo = this.weatherInfo.list.slice(0, 10);

      let forecast = this.forecastWeatherInfo.map(info => {
        return {
          date: info.dt_txt,
          temperature: info.main.temp,
          humidity: info.main.humidity,
          feelsLike: info.main.feels_like
        }});

      let json ={
        city:  this.cityName,
        zipCode: this.zipCode,
        forecast: forecast
      }
      this.weatherService.insertSearchHistory(JSON.parse(JSON.stringify(json))).subscribe(fromJson => {
        console.log('Sent Data')
      })
    })
  }
  getDailyWeather():void{
    this.isSearchHistoryEnabled = false
    this.isDisplay = false
    this.weatherService.getDailyWeather(this.cityName,this.zipCode).subscribe(data => {
      this.dailyWeatherInfo  = data;
      this.dailyforecastWeatherInfo=this.dailyWeatherInfo.forecast.forecastday
      console.log(data)
      /*let json ={
        city:  this.cityName,
        zipCode: this.zipCode,
        forecast: [
          {
            date: this.currentWeatherInfo.current.last_updated,
            temperature: this.currentWeatherInfo.current.temp_c ,
            humidity : this.currentWeatherInfo.current.humidity ,
            feelsLike : this.currentWeatherInfo.current.feelslike_c
          }
        ]
      }
      this.weatherService.insertSearchHistory(json).subscribe(fromJson => {
        console.log('Sent Data')
      })*/

    })
  }
    getHistoryWeather():void {
      this.isSearchHistoryEnabled = false
      this.time = this.myDate.getTime() - ((24 * 60 * 60 * 1000) * 1)
      this.myDate.setTime(this.time)
      this.oldDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')


      this.weatherService.getHistoryWeather(this.oldDate, this.zipCode).subscribe(data => {
        this.historyWeatherInfo = data;
        this.historyforecastWeatherInfo = this.historyWeatherInfo.forecast.forecastday
        console.log(data)
        let json ={
          city:  this.cityName,
          zipCode: this.zipCode,
          forecast: [
            {
              date: this.historyforecastWeatherInfo[0].date,
              temperature: this.historyforecastWeatherInfo[0].day.maxtemp_c,
              humidity : this.historyforecastWeatherInfo[0].day.avghumidity,
              feelsLike : this.historyforecastWeatherInfo[0].day.avgtemp_c,
            }
          ]
        }
        this.isDisplaying = false
        this.weatherService.insertSearchHistory(json).subscribe(fromJson => {
          console.log('Sent Data')
        })

      })
    }
      getSearchHistory():void{

        this.isSearchHistoryEnabled = true
        this.weatherService.getSearchHistory(this.cityName,this.zipCode).subscribe(data => {
          console.log(data);
          this.searchHistoryInfo  = data;
        })
  }

  clearDetails() {
    this.cityName = '';
    this.zipCode = '';
    this.isSeen=true;
    this.isDisplayed=true;
    this.isDisplay=true;
    this.isDisplaying=true;
    this.isSearchHistoryEnabled = false
  }

  ngOnInit() {
  }

}
