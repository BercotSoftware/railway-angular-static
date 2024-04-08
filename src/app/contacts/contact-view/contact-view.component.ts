import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingService} from "../../_services/loading.service";
import {Contact, ContactsService} from "@golf-api";
import {NotificationService} from "../../_services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {informalName} from "@utilities";

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css'
})
export class ContactViewComponent implements OnInit {

  contact: Contact = {}

  constructor(
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router : Router,
    private contactsService: ContactsService,
  ) {
  }

  ngOnInit(): void {
    const contactId = this.route.snapshot.params['id']
    if (contactId) {
      this.fetchContact(contactId);
    } else {
      this.notificationService.error("Error loading contact")
    }
  }


  fetchContact(id: string) {
    this.loadingService.next(true)
    this.contactsService.findContactById(id).subscribe({
      next: (result) => {
        this.contact = result
        this.loadingService.next(false)
      },
      error: (err) => {
        this.notificationService.error(err.error.message ?? "Error loading contact")
        this.loadingService.next(false)
      },
      complete: () => {
        this.loadingService.next(false)
      }
    })
  }

  protected readonly informalName = informalName;
}
