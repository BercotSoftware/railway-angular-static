import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleApiService} from "../google/people-api.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  contactResult: any

  constructor(private peopleApiService: PeopleApiService) {

  }

}
