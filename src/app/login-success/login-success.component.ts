import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.css'
})
export class LoginSuccessComponent {

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
    this.activeRoute.queryParamMap.subscribe({next: (params) => {
        console.log(`Login success: ${JSON.stringify(params)}`)
        authenticationService.setToken({
          refresh_token: params.get('refresh_token'),
          state: params.get('state'),
          nonce: params.get('nonce')
        })
        router.navigate(['/home'])
    }}
    )
  }

}
