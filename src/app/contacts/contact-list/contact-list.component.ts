import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsService, ContactSummary, Pageable} from "@golf-api";
import {BehaviorSubject} from "rxjs";
import {GoogleApiService} from "../../_services/google-api.service";
import {GoogleAuthService} from "../../_services/google-auth.service";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  private pageOptions: Pageable = { size: 20 };

  $contacts = new BehaviorSubject<ContactSummary[]>([]);
  totalItems = 0;

  constructor(private contactsService: ContactsService,
              private googleApi: GoogleApiService,
              private googleAuth: GoogleAuthService) {

  }

  ngOnInit(): void {
    this.contactsService.getContacts(this.pageOptions).subscribe({
      next: (result) => {
        this.$contacts.next(result.items || [])
        this.totalItems = result.totalItems || result.items?.length || 0
      },
      error: (err) => {
        console.log('Error fetching contacts', err)
      },
      complete: () => {

      }
    })
  }

  importContacts() {
      console.log('Import contacts here')
    this.googleAuth.signIn()
  }
}
