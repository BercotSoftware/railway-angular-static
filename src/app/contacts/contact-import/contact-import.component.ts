import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, from, map, of} from "rxjs";
import {Contact, ContactsService, EmailAddressEntry, PhoneNumberEntry} from "@golf-api";
import {PeopleApiService} from "@google";
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent {

  $contacts = new BehaviorSubject<Contact[]>([]);
  static phoneNumberUtil = PhoneNumberUtil.getInstance()

  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {
  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        const contacts = result.map(this.coerceConnection)
        console.log(`Imported ${contacts.length} contacts`)
        this.$contacts.next(contacts)
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

  /**
   * Convert the google API results into a simpler object
   * @param connection
   * @private
   */
  private coerceConnection(connection: any) : Contact {
    let result: Contact = {}

    if (Array.isArray(connection['names'])) {
      const nameObject = connection['names'][0]
      if (nameObject) {
        result.firstName = nameObject['givenName']
        result.lastName = nameObject['familyName']
        result.nickname = nameObject['nickname']
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

  private static convertEmail(googleEmail: any) : EmailAddressEntry {
    return {
      primary: true,
      address: googleEmail.value,
      verified: false,
      type: 'home'
    }
  }

  private static convertPhone(googlePhone: any) : PhoneNumberEntry {
    return {
      primary: true,
      number: ContactImportComponent.coercePhoneNumber(googlePhone['value']),
      verified: false,
      type: "mobile"
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
}
