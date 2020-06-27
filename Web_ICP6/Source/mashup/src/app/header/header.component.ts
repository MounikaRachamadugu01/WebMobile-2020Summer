import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    '.background {background:#000000; color: white}',
    'li a { color: white}',
    'ul.nav a:hover { color: darkseagreen },',
    'h2 {text-align: center; font-family: Arial, Helvetica, sans-serif;}'
  ]
})
export class HeaderComponent {
  constructor() {}

  }
