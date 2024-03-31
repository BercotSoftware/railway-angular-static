import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {ContactsService, ContactSummary} from "@golf-api";
import {PeopleApiService} from "../../google/people-api.service";


@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent implements OnInit {

  $contacts = new BehaviorSubject<any[]>([]);
  contactResult: any


  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {
  }

  ngOnInit(): void {
  }

  get canLoadMode() : boolean {
    return !!this.contactResult?.syncToken || !!this.contactResult?.nextPageToken
  }

  get canRevoke() : boolean {
    return !!this.contactResult
  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        console.log('loaded contacts', result)
        this.contactResult = result
      })
      .catch((error: Error) => {
          console.log('contact load failed', error)
        }
      )
  }

  revokePermissions() {
    this.contactResult = undefined
    this.peopleApiService.revokePermissions()
  }

}
