/**
 * Controls the status of the "Invite" button, returns true when it's OK to call the 'sendInvitation'
 * method
 */
import {Contact, ContactRequest, EmailAddressEntry, Profile} from "@golf-api";
import {validEmailEntry} from "./email-utilities";
import {informalName} from "./name-utilities";

export function primaryEmail(contact: Contact) : EmailAddressEntry | undefined {
  if (contact?.emailAddresses?.length) {
    const primary = contact.emailAddresses.filter(e => e.primary)
    if (primary.length > 0) {
      return primary[0]
    }
  }
  return undefined
}

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
