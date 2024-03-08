import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
      <a class="navbar-brand" href="#">Play Golf!</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/contacts">Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/courses">Courses</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/groups">Groups</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/events">Events</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/calendar">Calendar</a>
          </li>


        </ul>
      </div>
    </nav>
  `,
  styles: `
    .nav-item{
      padding:2px;
      margin-left: 7px;
    }
  `
})
export class HeaderComponent {

}
