import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {ContactsService, ContactSummary} from "@golf-api";
import {PeopleApiService} from "../../_services/people-api.service";


@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent implements OnInit {

  $contacts = new BehaviorSubject<any[]>([]);
  private nextPageToken: any;
  private totalItems: number = 0;
  private totalPeople: number = 0;


  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {
  }

  ngOnInit(): void {
  }


  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        console.log('loaded contacts', result)
        this.nextPageToken = result.nextPageToken
        this.totalPeople = result.totalPeople || 0
        this.totalItems = result.totalItems || 0
        this.$contacts.next(result.connections)
      })
      .catch((error: Error) => {
          console.log('contact load failed', error)
        }
      )

  }


}
