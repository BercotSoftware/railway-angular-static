import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map} from "rxjs";
import {Contact, ContactsService, EmailAddressEntry, PhoneNumberEntry} from "@golf-api";
import {PeopleApiService} from "@google";
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
import {TablePagerComponent} from "../../_controls/table-pager/table-pager.component";
import {TableDataSource} from "../../_utilities/table-data-source";

// see: https://getbootstrap.com/docs/4.0/content/tables/

interface ExtendedContact extends Contact {
  selected?: boolean
}


@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule, TablePagerComponent],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent implements OnInit {

  static phoneNumberUtil = PhoneNumberUtil.getInstance()

  pageSizeOptions = [10, 15, 20, 50, 75, 100]
  dataSource = new TableDataSource<any>()

  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {

    // let DUMMY_DATA: Array<ExtendedContact> = []
    // for (let i = 0; i < 123; i++) {
    //   DUMMY_DATA.push({
    //     givenName: `firstName${i}`,
    //     familyName: `lastName${i}`,
    //     nickname: `nickname${i}`,
    //     emailAddresses: [
    //       {primary: true, address: `my-email${i}@mailhost.com`, type: 'home', verified: true}
    //     ],
    //     phoneNumbers: [
    //       {primary: true, number: '(999)-555-1212', type: 'mobile', verified: true}
    //     ]
    //   })
    // }
    // this.dataSource.loadData(DUMMY_DATA)
  }

  private static convertEmail(value: any): EmailAddressEntry {
    return {
      primary: value.metadata?.primary || false,
      address: value.value,
      verified: false,
      type: value.type || 'home'
    }
  }

  private static convertPhone(value: any): PhoneNumberEntry {
    return {
      primary: value.metadata?.primary || false,
      number: ContactImportComponent.coercePhoneNumber(value.value),
      verified: false,
      type: value.type || 'home'
    }
  }

  private static coercePhoneNumber(phoneNumber?: string) {
    if (phoneNumber) {
      const phoneNumberUtil = PhoneNumberUtil.getInstance()
      const phone = phoneNumberUtil.parse(phoneNumber, "US")
      return (phone) ? phoneNumberUtil.format(phone, PhoneNumberFormat.NATIONAL) : undefined
    } else {
      return undefined
    }
  }

  ngOnInit(): void {
  }

  /**
   * Used to allow commit of selected items
   */
  noSelectedContacts() {
    return this.dataSource.data$.pipe(
      map(items => !items.some(item => item.selected))
    )
  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        console.log('Google contacts', result)
        const contacts = result.map(this.coerceConnection)
        console.log(`Imported ${contacts.length} contacts`)
        this.dataSource.loadData(contacts)
      })
      .catch((error) => {
        console.log('Error importing contacts', error)
      })
  }

  revokePermissions() {
    this.peopleApiService.revokePermissions()
  }

  primaryPhoneNumber(contact: Contact) {
    if (contact.phoneNumbers) {
      const phone = contact.phoneNumbers.find(p => p.primary === true)
      return (phone) ? phone.number : undefined
    }
    return undefined
  }

  primaryEmail(contact: Contact) {
    if (contact.emailAddresses) {
      const email = contact.emailAddresses.find(p => p.primary === true)
      return email ? email.address : undefined
    }
    return undefined
  }

  removeContact(contact: ExtendedContact) {
    let index = this.dataSource.dataSubject.value.findIndex(obj => obj === contact);
    if (index >= 0) {
      this.dataSource.dataSubject.value.splice(index, 1)
    }
  }

  selectContact(contact: ExtendedContact) {
    contact.selected = true
  }

  unselectContact(contact: ExtendedContact) {
    contact.selected = false
  }

  toggleSelected(contact: ExtendedContact) {
    contact.selected = !contact.selected
  }

  addContacts() {
    console.log('Adding contacts!!')
    this.dataSource.dataSubject.pipe(
      map(items => items.filter(item => item.selected))
    ).subscribe(selectedItems => {

      if (selectedItems.length > 0) {

        this.contactsService.batchCreateContacts(selectedItems)
          .subscribe({
            next: (result) => {
              console.log('Saved contacts!')
              this.dataSource.dataSubject.next(this.dataSource.dataSubject.getValue().filter(item => !item.selected));
            },
            error: (err) => {
              console.log('Error adding contacts', err)
            }
          })

      }

    })

    // TODO commit to REST controller


  }

  /**
   * Convert the google API results into a simpler object
   * @param connection
   * @private
   */
  private coerceConnection(connection: any): Contact {
    let result: Contact = {}

    if (Array.isArray(connection['names'])) {
      const nameObject = connection['names'][0]
      if (nameObject) {
        result.givenName = nameObject.givenName
        result.familyName = nameObject.familyName
        result.nickname = nameObject.nickname
        result.googleContactId = nameObject.metadata?.source?.id
      }
    }
    if (Array.isArray(connection['emailAddresses'])) {
      result.emailAddresses = connection['emailAddresses']
        .map(ContactImportComponent.convertEmail)
        .filter(value => value !== undefined)
    } else {
      result.emailAddresses = []
    }
    if (Array.isArray(connection['phoneNumbers'])) {
      result.phoneNumbers = connection['phoneNumbers']
        .map(ContactImportComponent.convertPhone)
        .filter(value => value !== undefined)
    } else {
      result.phoneNumbers = []
    }

    return result
  }

}
