import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, from, map, of} from "rxjs";
import {Contact, ContactsService, EmailAddressEntry, PhoneNumberEntry} from "@golf-api";
import {PeopleApiService} from "@google";
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

interface ExtendedContact extends Contact {
  selected?: boolean
}

const DUMMY_DATA: ExtendedContact[] = [
  { firstName: 'dummy1', lastName: 'dummy1', nickname: 'dummy1', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy2', lastName: 'dummy2', nickname: 'dummy2', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy3', lastName: 'dummy3', nickname: 'dummy3', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy4', lastName: 'dummy4', nickname: 'dummy4', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy5', lastName: 'dummy5', nickname: 'dummy5', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy6', lastName: 'dummy6', nickname: 'dummy6', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
  { firstName: 'dummy7', lastName: 'dummy7', nickname: 'dummy7', emailAddresses: [{ primary: true, address: 'my-email@mailhost.com', type: 'home', verified: true }], phoneNumbers: [{ primary: true, number: 'my-email@mailhost.com', type: 'mobile', verified: true }] },
]

@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent {

  $contacts = new BehaviorSubject<ExtendedContact[]>(DUMMY_DATA);
  static phoneNumberUtil = PhoneNumberUtil.getInstance()

  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {

  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        console.log('Google contacts', result)
        const contacts = result.map(this.coerceConnection)
        console.log(`Imported ${contacts.length} contacts`)
        this.$contacts.next(contacts)
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

  private static convertEmail(value: any) : EmailAddressEntry {
    return {
      primary: value.metadata?.primary || false,
      address: value.value,
      verified: false,
      type: value.type || 'home'
    }
  }

  private static convertPhone(value: any) : PhoneNumberEntry {
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

  removeContact(index: number) {
    this.$contacts.value.splice(index, 1)
  }

  selectContact(i: number) {
    this.$contacts.value[i].selected = true
  }

  unselectContact(i: number) {
    this.$contacts.value[i].selected = false
  }

  toggleSelected(i: number) {
    this.$contacts.value[i].selected = !this.$contacts.value[i].selected
  }
}
