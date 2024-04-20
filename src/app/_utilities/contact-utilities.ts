/**
 * Controls the status of the "Invite" button, returns true when it's OK to call the 'sendInvitation'
 * method
 */
import {Contact, ContactRequest, EmailAddressEntry, Profile} from "@golf-api";
import {informalName, validEmailEntry} from "@utilities";

/**
 * Find the primary e-mail address for a contact
 * @param contact Contact object
 */
export function primaryEmail(contact?: Contact) : EmailAddressEntry | undefined {
  if (contact?.emailAddresses?.length) {
    return contact.emailAddresses
        .find(e => e.primary)
  }
  return undefined
}

/**
 * Find the primary e-mail address for a contact
 * @param contact Contact object
 */
export function primaryEmailAddress(contact?: Contact) {
  return primaryEmail(contact)?.address
}

/**
 * Find the primary phone number for a contact
 * @param contact Contact object
 */
export function primaryPhone(contact?: Contact) {
  if (contact?.phoneNumbers?.length) {
    return contact.phoneNumbers
        .find(p => p.primary === true)
  }
  return undefined
}

/**
 * Find the primary phone number for a contact
 * @param contact Contact object
 */
export function primaryPhoneNumber(contact?: Contact) {
  return primaryPhone(contact)?.number
}

/**
 * Returns true if a contact could be sent an invitation
 * @param contact Contact object
 */
export function couldInviteContact(contact: Contact | undefined) : boolean {
  if (contact) {
    // const hasProfileId = idIsAssigned(contact.profileId)
    const isAccepted = contact.status ? contact.status === Contact.StatusEnum.Accepted || contact.status === Contact.StatusEnum.Pending : false
    const emailValid = validEmailEntry(primaryEmail(contact))

    return !isAccepted && emailValid
  } else {
    return false
  }
}

/**
 * Create a contact invitation
 * @param from
 * @param contact
 */
export function createContactRequest(from: Profile, contact: Contact) : ContactRequest {
  const request = {} as ContactRequest
  const sender = informalName(from)
  const receiver = informalName(contact)
  const baseUrl = window.location.origin // environment.baseUrl

  request.id = contact.id
  request.replyUrl = `${baseUrl}/invitations/contact`
  request.message = `
<div>
  <p>Dear ${receiver},</p>
  <p>${sender} would like to add you to his list of contacts. Please accept or reject using one of the links below.</p>
  <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px;">
    <a href="${baseUrl}/invitations/contact?accept={{token}}">Accept</a>
    <a href="${baseUrl}/invitations/contact?decline={{token}}">Decline</a>
  </div>
</div>`
  return request;
}
