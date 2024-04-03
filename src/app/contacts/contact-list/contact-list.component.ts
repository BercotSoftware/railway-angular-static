import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsService, ContactSummary, Pageable} from "@golf-api";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {TablePageEvent, TablePagerComponent} from "../../_controls/table-pager/table-pager.component";
import {PagedResult, TableDataSource} from "../../_controls/table-pager/table-datasource";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TablePagerComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  pageSizeOptions = [ 10, 15, 20, 50, 75, 100 ]
  dataSource: TableDataSource<ContactSummary>

  constructor(private contactsService: ContactsService,
              private route : ActivatedRoute,
              private router: Router) {
    this.dataSource = new TableDataSource<ContactSummary>(this.getTableData.bind(this), 20)
  }

  ngOnInit(): void {
    this.dataSource.loadData() // Prime the pump
  }

  importContacts() {
    this.router.navigate(['import'], { relativeTo: this.route.parent })
  }

  getTableData = async (pageOptions: Pageable) : Promise<PagedResult<ContactSummary>> => {
    return new Promise((resolve, reject) => {
      this.contactsService.getContacts(pageOptions).subscribe({
        next: (result) => {
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

}
