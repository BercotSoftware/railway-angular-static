import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {HeaderComponent} from "./layout/header.component";
import {FooterComponent} from "./layout/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
  apiUrl = environment.apiUrl
  authUrl = environment.authUrl


  constructor(
    private router: Router,
    private route : ActivatedRoute) {
  }

}
