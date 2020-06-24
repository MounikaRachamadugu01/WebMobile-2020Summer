import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public eventname: string;
  public eventDate: any;
  public days: any;
  public hours: any;
  public minutes: any;
  public seconds: any;
  public timerDetails: any;
  public timerCount =false;
  constructor() { }
  
 // to display timer info
  showTimerInfo() {
    this.timerCount = !this.timerCount;
    const eventdate = new Date(this.eventDate).getTime();
 // update time every second
    setInterval(( )=> {
 // read today's date
      const now = new Date().getTime();
 // to find difference between entered event date and today's date
      const difference = eventdate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      this.timerDetails = {
        days,
        hours,
        minutes,
        seconds
      }
     
    }, 1000);
  }

}