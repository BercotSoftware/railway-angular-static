import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {HeaderComponent} from "./layout/header.component";
import {FooterComponent} from "./layout/footer.component";
import {OidcSecurityService} from "angular-auth-oidc-client";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
  playGolfApiUrl = environment.PLAY_GOLF_API_URL
  jwtIssuerUrl = environment.JWT_ISSUER_URL


  constructor(
    private authService: OidcSecurityService,
    private router: Router,
    private route : ActivatedRoute) {

    authService.checkAuth().subscribe({
      next: (result) => {
        console.log(`checkAuth result ${JSON.stringify(result)}`)
      },
      error: (err) => {
        console.log(`checkAuth error ${err}`)
      },
      complete: () => {}
    })
  }


}
