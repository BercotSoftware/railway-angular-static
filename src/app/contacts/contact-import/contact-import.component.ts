import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {ContactDetails, ContactsService} from "@golf-api";
import {PeopleApiService} from "../../google/people-api.service";
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

@Component({
  selector: 'app-contact-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-import.component.html',
  styleUrl: './contact-import.component.css'
})
export class ContactImportComponent {

  $contacts = new BehaviorSubject<ContactDetails[]>([]);
  static phoneNumberUtil = PhoneNumberUtil.getInstance()

  constructor(private contactsService: ContactsService,
              private peopleApiService: PeopleApiService) {
  }

  importContacts() {
    this.peopleApiService.getContactList()
      .then((result) => {
        const contacts = result.map(this.coerceConnection)
        this.$contacts.next(contacts)
      })

  }

  revokePermissions() {
    this.peopleApiService.revokePermissions()
  }

  /**
   * Convert the google API results into a simpler object
   * @param connection
   * @private
   */
  private coerceConnection(connection: any) : ContactDetails {
    let result: ContactDetails = {}

    if (Array.isArray(connection['names'])) {
      const nameObject = connection['names'][0]
      if (nameObject) {
        result.firstName = nameObject['givenName']
        result.lastName = nameObject['familyName']
        result.nickname = nameObject['nickname']
      }
    }
    if (Array.isArray(connection['emailAddresses'])) {
      const emailObject = connection['emailAddresses'][0]
      if (emailObject) {
        // result.emailType = emailObject['formattedType']
        result.email = emailObject['value']
      }
    }
    if (Array.isArray(connection['phoneNumbers'])) {
      const phoneObject = connection['phoneNumbers'][0]
      if (phoneObject) {
        // result.phoneType = phoneObject['formattedType']
        result.phone = ContactImportComponent.coercePhoneNumber(phoneObject['value'])
      }
    }

    return result
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
