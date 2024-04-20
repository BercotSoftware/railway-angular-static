import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsService, Contact} from "@golf-api";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {TablePagerComponent} from "../../_controls/table-pager/table-pager.component";
import {PagedResult, PagedTableDataSource} from "../../_controls/table-pager/paged-table-data-source";
import {formatPhoneNumber, informalName, Pageable, primaryEmailAddress, primaryPhoneNumber} from "@utilities";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TablePagerComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  pageSizeOptions = [ 10, 15, 20, 50, 75, 100 ]
  dataSource: PagedTableDataSource<Contact>

  constructor(private contactsService: ContactsService,
              private route : ActivatedRoute,
              private router: Router) {
    this.dataSource = new PagedTableDataSource<Contact>(this.getTableData.bind(this), 20)
  }

  ngOnInit(): void {
    this.dataSource.loadData() // Prime the pump
  }

  getTableData = async (pageOptions: Pageable) : Promise<PagedResult<Contact>> => {
    return new Promise((resolve, reject) => {
      this.contactsService.getContacts(pageOptions.page, pageOptions.size, pageOptions.sort).subscribe({
        next: (result) => {
          // console.log('Contacts', result.items)
          resolve({ totalItems: result.totalItems, items: result.items })
        },
        error: (err) => {
          console.log('Error fetching contacts', err)
          reject(err)
        },
        complete: () => {
        }
      })
    })
  }

  selectContact(contact: Contact) {
    this.router.navigate([contact.id], { relativeTo: this.route.parent })
  }

  protected readonly formatPhoneNumber = formatPhoneNumber;
  protected readonly informalName = informalName;
  protected readonly primaryPhoneNumber = primaryPhoneNumber;
  protected readonly primaryEmailAddress = primaryEmailAddress;
}
