import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
  playGolfApiUrl = environment.PLAY_GOLF_API_URL
  jwtIssuerUrl = environment.JWT_ISSUER_URL


  constructor(
    private router: Router,
    private route : ActivatedRoute) {
  }

}
