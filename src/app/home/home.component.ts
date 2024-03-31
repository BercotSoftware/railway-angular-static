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

  constructor(private peopleApiService: PeopleApiService) {

  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        console.log('loaded contacts', result)
        // this.nextPageToken = result.nextPageToken
        // this.totalPeople = result.totalPeople || 0
        // this.totalItems = result.totalItems || 0
        // this.$contacts.next(result.connections)
      })
      .catch((error: Error) => {
          console.log('contact load failed', error)
        }
      )

  }

  revokePermissions() {
    this.peopleApiService.revokePermissions()
  }
}
