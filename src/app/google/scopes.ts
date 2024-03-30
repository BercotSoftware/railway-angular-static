export const OAUTH2_SCOPES = {
  EMAIL: "email",
  PROFILE: "profile",
  OPENID: "openid",
  CONTACTS_READONLY: "https://www.googleapis.com/auth/contacts.readonly",
  USERINFO_PROFILE: "https://www.googleapis.com/auth/userinfo.profile",
  USERINFO_EMAIL: "https://www.googleapis.com/auth/userinfo.email",

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
  return input.split(' ').filter(substring => substring.trim() !== '');
}
