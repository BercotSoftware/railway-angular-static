import {EmailAddressEntry} from "@golf-api";

const EMAIL_VALID_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validEmail(email : string | undefined) : boolean {
  if (email) {
    return EMAIL_VALID_REGEX.test(email);
  } else {
    return false;
  }
}

export function validEmailEntry(email : EmailAddressEntry | undefined) : boolean {
  if (email) {
    return validEmail(email.address)
  } else {
    return false;
  }
}

export function emailLink(value?: string) : string {
  return (value && value.length > 0) ? `mailto:${value}` : ''
}
