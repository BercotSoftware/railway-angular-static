import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsService, ContactSummary, Pageable} from "@golf-api";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {TablePageEvent, TablePagerComponent} from "../../_controls/table-pager/table-pager.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TablePagerComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  private pageOptions: Pageable = { size: 20 };

  $contacts = new BehaviorSubject<ContactSummary[]>([]);
  totalItems = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [ 10, 15, 20, 50, 75, 100 ]

  constructor(private contactsService: ContactsService,
              private route : ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getContacts()
  }

  importContacts() {
    this.router.navigate(['import'], { relativeTo: this.route.parent })
  }

  private getContacts() {
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

  onPageSelect($event: TablePageEvent) {
    this.pageOptions.page = $event.pageIndex
    this.pageOptions.size = $event.pageSize
    this.getContacts()
  }
}
