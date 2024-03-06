import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {ApiModule, Configuration, ConfigurationParameters} from "@golf-api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  constructor(
    private router: Router,
    private route : ActivatedRoute
  ) {

  }

}
