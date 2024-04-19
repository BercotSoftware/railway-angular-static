export const OAUTH2_SCOPES = {
  EMAIL: "email",
  PROFILE: "profile",
  OPENID: "openid",


  // See, edit, download, and permanently delete your contacts
  CONTACTS: 'https://www.googleapis.com/auth/contacts',

  // See and download contact info automatically saved in your "Other contacts"
  CONTACTS_OTHER_READONLY: 'https://www.googleapis.com/auth/contacts.other.readonly',

  // See and download your contacts
  CONTACTS_READONLY: 'https://www.googleapis.com/auth/contacts.readonly',

  // See and download your organization's GSuite directory
  DIRECTORY_READONLY: 'https://www.googleapis.com/auth/directory.readonly',

  // View your street addresses
  ADDRESSES_READ: 'https://www.googleapis.com/auth/user.addresses.read',

  // See and download your exact date of birth
  USER_BIRTHDAY_READ: 'https://www.googleapis.com/auth/user.birthday.read',

  // See and download all of your Google Account email addresses
  USER_EMAILS_READ: 'https://www.googleapis.com/auth/user.emails.read',

  // See your gender
  USER_GENDER_READ: 'https://www.googleapis.com/auth/user.gender.read',

  // See your education, work history and org info
  USER_ORGANIZATION_READ: 'https://www.googleapis.com/auth/user.organization.read',

  // See and download your personal phone numbers
  USER_PHONENUMBERS_READ: 'https://www.googleapis.com/auth/user.phonenumbers.read',

  // See your primary Google Account email address
  USERINFO_EMAIL: 'https://www.googleapis.com/auth/userinfo.email',

  // See your personal info, including any personal info you've made publicly available
  USERINFO_PROFILE: 'https://www.googleapis.com/auth/userinfo.profile',
}

/**
 * Create a single string for requesting access that contains an array of
 * scope strings separated by spaces
 * @param input
 * @constructor
 */
export function ScopesAsString(input: string | string[]): string {
  if (typeof input === 'string') {
    // If input is a string, just return it
    return input;
  } else if (Array.isArray(input)) {
    // If input is an array of strings, join them with a space
    return input.join(' ');
  } else {
    // Handle other cases where input is neither string nor string array
    throw new Error('Invalid input. Expecting string or string array.');
  }
}

/**
 * Decode the "scopes" string as an array of scopes
 * @param input
 * @constructor
 */
export function StringAsScopes(input: string) : string[] {
  if (input) {
    return input.split(' ').filter(substring => substring.trim() !== '');
  } else {
    return []
  }
}
